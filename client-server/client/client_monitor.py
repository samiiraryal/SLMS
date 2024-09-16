import os
import sys
import subprocess
import time
import logging
import platform
import requests
import json
import winreg as reg
from pathlib import Path
import argparse
import psutil
import GPUtil
import ctypes
from datetime import datetime, timedelta
import uuid

# Add this near the top of your file, after other imports
CLIENT_ID_FILE = Path.home() / "AppData" / "Local" / "SystemMonitor" / "client_id.json"

HIGH_USAGE_THRESHOLD = 80  # Example threshold
high_usage_start = None
high_usage_duration = 0

# Set up logging in user's home directory
log_dir = Path.home() / "AppData" / "Local" / "SystemMonitor"
log_dir.mkdir(parents=True, exist_ok=True)
log_file = log_dir / 'system_monitor.log'

# Configure logging to both file and console
logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s - %(levelname)s - %(message)s',
                    handlers=[
                        logging.FileHandler(log_file),
                        logging.StreamHandler()
                    ])
logger = logging.getLogger(__name__)

SERVER_URL = "http://18.141.49.211:8080/process"
CRASH_REPORT_URL = "http://18.141.49.211:8080/report_crash"

# File to store computer runtime data
RUNTIME_FILE = log_dir / 'computer_runtime.json'



def get_or_create_client_id():
    if CLIENT_ID_FILE.exists():
        with open(CLIENT_ID_FILE, 'r') as f:
            return json.load(f)['client_id']
    else:
        client_id = str(uuid.uuid4())
        CLIENT_ID_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(CLIENT_ID_FILE, 'w') as f:
            json.dump({'client_id': client_id}, f)
        return client_id
    

def measure_network_latency():
    try:
        start_time = time.time()
        subprocess.run(["ping", "-n", "1", "8.8.8.8"], capture_output=True, text=True, timeout=5)
        end_time = time.time()
        return (end_time - start_time) * 1000  # Convert to milliseconds
    except Exception as e:
        logger.error(f"Error measuring network latency: {e}")
        return 0

def get_storage_metrics():
    try:
        storage = psutil.disk_usage('/')
        return {
            'total': storage.total / (1024 ** 3),  # Convert to GB
            'used': storage.used / (1024 ** 3),
            'free': storage.free / (1024 ** 3),
            'percent': storage.percent
        }
    except Exception as e:
        logger.error(f"Error getting storage metrics: {e}")
        return {}

def get_computer_runtime():
    if RUNTIME_FILE.exists():
        with open(RUNTIME_FILE, 'r') as f:
            data = json.load(f)
        last_shutdown = datetime.fromtimestamp(data['last_shutdown'])
        total_runtime = timedelta(hours=data['total_runtime'])
    else:
        last_shutdown = datetime.fromtimestamp(psutil.boot_time())
        total_runtime = timedelta()

    current_time = datetime.now()
    current_session = current_time - datetime.fromtimestamp(psutil.boot_time())
    total_runtime += current_session

    return total_runtime.total_seconds() / 3600  # Convert to hours

def update_runtime_file():
    current_time = datetime.now().timestamp()
    total_runtime = get_computer_runtime()

    data = {
        'last_shutdown': current_time,
        'total_runtime': total_runtime
    }

    with open(RUNTIME_FILE, 'w') as f:
        json.dump(data, f)

def report_crash(app_name):
    try:
        crash_data = {
            'hostname': platform.node(),
            'app_name': app_name,
            'timestamp': datetime.now().isoformat()
        }
        response = requests.post(CRASH_REPORT_URL, json=crash_data, timeout=10)
        if response.status_code == 200:
            logger.info(f"Crash reported successfully for app: {app_name}")
        else:
            logger.error(f"Failed to report crash. Status code: {response.status_code}")
    except Exception as e:
        logger.error(f"Error reporting crash: {e}")

# Generate a unique client ID
CLIENT_ID = get_or_create_client_id()
print(f"Client ID: {CLIENT_ID}")  # Verify the generated/retrieved client ID

def collect_metrics():
    global high_usage_start, high_usage_duration

    data = {}
    data['cpu'] = float(psutil.cpu_percent(interval=1))
    data['ram'] = float(psutil.virtual_memory().percent)
    data['client_id'] = CLIENT_ID
    try:
        gpus = GPUtil.getGPUs()
        if gpus:
            data['gpu'] = float(gpus[0].load * 100)
        else:
            data['gpu'] = 0.0
    except Exception as e:
        data['gpu'] = 0.0
        logger.error(f"Error getting GPU usage: {e}")
    data['network'] = float(measure_network_latency())
    data['storage'] = get_storage_metrics()
    data['hostname'] = platform.node()
    data['uptime'] = float(time.time() - psutil.boot_time())

    # Calculate usage score
    data['usage_score'] = float((data['cpu'] + data['ram'] + data['gpu'] + data['storage']['percent']) / 400)

    # Calculate high usage duration
    if data['usage_score'] > 0.5:
        if high_usage_start is None:
            high_usage_start = datetime.now()
        high_usage_duration = float((datetime.now() - high_usage_start).total_seconds() / 3600)  # Convert to hours
    else:
        if high_usage_start is not None:
            data['high_usage_duration'] = high_usage_duration
            high_usage_start = None
            high_usage_duration = 0.0
        else:
            data['high_usage_duration'] = 0.0

    logger.debug(f"Collected metrics: {json.dumps(data, indent=2)}")
    return data

def send_metrics_to_server(data):
    try:
        # Include the Client-ID in both the headers and the JSON data
        headers = {'Client-ID': CLIENT_ID}
        print(f"Sending data with headers: {headers} and JSON: {data}")  # Verify data being sent
        response = requests.post(SERVER_URL, json=data, headers=headers, timeout=10)
        if response.status_code == 200:
            result = response.json()
            logger.info(f"Metrics sent successfully. Server response: {json.dumps(result, indent=2)}")
            return result
        else:
            logger.error(f"Failed to send metrics. Status code: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        logger.error(f"Error sending metrics to server: {e}")
        return None

def add_to_startup():
    key_path = r"Software\Microsoft\Windows\CurrentVersion\Run"
    try:
        key = reg.OpenKey(reg.HKEY_CURRENT_USER, key_path, 0, reg.KEY_ALL_ACCESS)
        reg.SetValueEx(key, "SystemMonitor", 0, reg.REG_SZ, f'"{sys.executable}" "{os.path.abspath(__file__)}" --minimized')
        reg.CloseKey(key)
        logger.info("Added to startup successfully")
    except WindowsError as e:
        logger.error(f"Failed to add to startup: {e}")

def run_minimized():
    if sys.platform.startswith('win'):
        ctypes.windll.user32.ShowWindow(ctypes.windll.kernel32.GetConsoleWindow(), 6)  # SW_MINIMIZE = 6

def parse_arguments():
    parser = argparse.ArgumentParser(description="System Monitor Client")
    parser.add_argument("--test", action="store_true", help="Run in test mode (8 iterations)")
    parser.add_argument("--minimized", action="store_true", help="Run the script minimized")
    return parser.parse_args()

def run_continuous_monitoring():
    logger.info("Starting continuous monitoring...")
    while True:
        try:
            metrics = collect_metrics()
            result = send_metrics_to_server(metrics)
            if result:
                logger.info(f"Server response - Result: {result['result']}")
                logger.info(f"Server response - Confidence: {result['confidence']:.2f}")
                logger.info(f"Server response - Scores: {json.dumps(result['scores'], indent=2)}")
                logger.info(f"Server response - Metrics: {json.dumps(result['metrics'], indent=2)}")
                
                if result['result'] == 'maintenance_needed':
                    logger.warning("The system requires maintenance based on the collected metrics.")
                elif result['result'] == 'high_usage':
                    logger.warning("The system is experiencing high usage.")
                elif result['result'] == 'moderate':
                    logger.info("The system is experiencing moderate usage.")
                elif result['result'] == 'running_good':
                    logger.info("The system is running well.")
                else:
                    logger.warning(f"Unknown result from the server: {result['result']}")
            time.sleep(10)  # Wait for 10 minutes before the next collection
        except Exception as e:
            logger.error(f"Error in continuous monitoring: {e}")
            time.sleep(5)  # Wait for 1 minute before retrying

def run_test_mode():
    print("Running in test mode (8 iterations)")
    for i in range(8):
        metrics = collect_metrics()
        result = send_metrics_to_server(metrics)
        if result:
            print(f"Run {i+1}: Result: {result['result']}, Confidence: {result['confidence']:.2f}")
            print(f"Metrics: {json.dumps(result['metrics'], indent=2)}")
        time.sleep(5)  # Wait for 5 seconds before the next run

def main():
    args = parse_arguments()
    logger.info("Starting System Monitor Client")
    
    if args.minimized:
        run_minimized()
    else:
        ctypes.windll.user32.MessageBoxW(0, "This is a tool to measure system metrics for lab maintenance. The window will be minimized to prevent accidental closing.", "Lab System Monitor", 0x40)
        run_minimized()
    
    if not args.test:
        add_to_startup()
        run_continuous_monitoring()
    else:
        run_test_mode()

    # Update runtime file before exit
    update_runtime_file()

if __name__ == "__main__":
    main()
