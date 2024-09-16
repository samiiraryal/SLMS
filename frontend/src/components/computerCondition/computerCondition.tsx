import React, { useState, useEffect } from "react";
import BackButton from "../../utils/back-button.js";
import getComputerCondition, {
  ComputerConditionProps,
} from "../../api/get-metrics.js";
import styles from "./computerCondition.module.css";

const ComputerCondition = () => {
  const [selectedComputer, setSelectedComputer] =
    useState<ComputerConditionProps>();
  const [computers, setComputers] = useState<ComputerConditionProps[]>();
  const { data: computerData } = getComputerCondition();

  const handleComputerClick = (computer: ComputerConditionProps) => {
    setSelectedComputer(computer);
  };

  useEffect(() => {
    setComputers(computerData);
  }, [computerData]);

  return (
    <div className={styles.computerCondition}>
      <h1>Computer Condition</h1>
      <div style={{ alignSelf: "flex-start", float: "left" }}>
        <BackButton href="/" />
      </div>
      <div className={styles.grid}>
        {computers?.map((computer) => (
          <div
            key={computer.hostname}
            className={`${styles.computer} ${
              computer.result === "maintenance_needed"
                ? styles.needsMaintenance
                : ""
            }`}
            onClick={() => handleComputerClick(computer)}
          >
            {computer.hostname}
          </div>
        ))}
      </div>
      {selectedComputer && (
        <div className={styles.computerDetails}>
          <h2>{selectedComputer.hostname + " Details"}</h2>
          <p>ID: {selectedComputer.client_id}</p>
          <p>CPU Usage: {selectedComputer.cpu}</p>
          <p>GPU: {selectedComputer?.gpu}</p>
          <p>Network: {selectedComputer?.network}</p>
          <p>Ram: {selectedComputer?.ram}</p>
          <p>recentHighUsageDuration: {selectedComputer?.recent_high_usage_duration}</p>
          <p>totalHighUsageDuration: {selectedComputer?.total_high_usage_duration}</p>
          <p>UpTime: {selectedComputer?.uptime}</p>
          <p>UsageScore: {selectedComputer?.usage_score}</p>
          <p>Free: {selectedComputer?.storage.free}</p>
          <p>Percentage: {selectedComputer?.storage.percent}%</p>
          <p>Total: {selectedComputer?.storage.total}</p>
          <p>Used: {selectedComputer?.storage.used}</p>
          <p>HighUsage: {selectedComputer?.high_usage}</p>
          <p>MaintainanceNeeded: {selectedComputer?.maintenance_needed}</p>
          <p>Moderate: {selectedComputer?.moderate}</p>
          <p>RunningGood: {selectedComputer?.running_good}</p>
          <p>Result: {selectedComputer?.result}</p>
          <p>Confidence: {selectedComputer.confidence}</p>
          <p>Status: {selectedComputer.result}</p>
        </div>
      )}
    </div>
  );
};

export default ComputerCondition;
