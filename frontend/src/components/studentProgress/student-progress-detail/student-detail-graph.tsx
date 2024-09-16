import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getBgColor = (days: number) => {
  if (days > 9 && days < 16) {
    return "#02c436";
  } else if (days > 4 && days < 10) {
    return "#cef522";
  } else {
    return "#f58822";
  }
};

const StudentDetailGraph = ({ student }: { student: any }) => {
  const data = {
    labels: ["Student Data"],
    datasets: [
      {
        label: "Total Days",
        data: [student?.presentDays + student?.absentDays],
        backgroundColor: "#90EE90",
        borderColor: [getBgColor(student?.presentDays)],
        borderWidth: 1,
      },
      {
        label: "Present days",
        data: [student?.presentDays],
        backgroundColor: "#008000",
        borderColor: [getBgColor(student?.presentDays)],
        borderWidth: 1,
      },
      {
        label: "Total Reports",
        data: [student?.labReports?.totalReports],
        backgroundColor: "#ADD8E6",
        borderColor: [getBgColor(student?.labReports?.totalReports)],
        borderWidth: 1,
      },
      {
        label: "Report submitted",
        data: [student?.labReports?.submittedReports],
        backgroundColor: "#0000FF",
        borderColor: [getBgColor(student?.labReports?.submittedReports)],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: student?.presentDays + student?.absentDays, // Set max to total number of days in the academic period
        ticks: {
          stepSize: 5, // Customize the step size as needed
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StudentDetailGraph;

export const StudentLabReportDetailGraph = ({ student }: { student: any }) => {
  const data = {
    labels: ["Lab Report Days"],
    datasets: [
      {
        label: "Lab Report Days",
        data: [
          student?.labReports?.submittedReports,
          student?.labReports?.totalReports,
        ],
        backgroundColor: [getBgColor(student?.labReports?.submittedReports)],
        borderColor: [getBgColor(student?.labReports?.submittedReports)],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: student?.labReports?.totalReports, // Set max to total number of days in the academic period
        ticks: {
          stepSize: 5, // Customize the step size as needed
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
