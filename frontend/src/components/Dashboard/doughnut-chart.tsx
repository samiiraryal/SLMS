import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import styles from "./chart.module.css";
import getDoughnutData, {
  getDoughnutReportData,
} from "../../api/get-doughnut-chart-data.js";
import { useContext, useEffect, useState } from "react";
import { CreateLabContext } from "../../context/lab-context.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DoughnutChart = () => {
  // @ts-ignore
  const { selectCourse, selectSemester } = useContext(CreateLabContext);
  const [attendance, setAttendance] = useState();
  const [report, setReport] = useState();

  const { data: doughnutData } = getDoughnutData(selectSemester, selectCourse);
  const { data: doughnutReportData } = getDoughnutReportData(
    selectSemester,
    selectCourse
  );

  useEffect(() => {
    setAttendance(doughnutData?.attendancePercentage?.toFixed(2));
    setReport(doughnutReportData)
  }, [doughnutData, selectCourse, doughnutReportData]);

  // useEffect(() => {
  //   setReport(doughnutReportData?.changeThis?.toFixed(2));
  // }, [report, selectCourse]);

  let attendanceData = [
    {
      label: "Present",
      value: doughnutData?.totalPresentDays, // present day data
      color: "rgba(0, 123, 255, 1)",
    },
    {
      label: "Absent",
      value: doughnutData?.totalAbsentDays, // absent day data
      color: "rgba(255, 165, 0, 1)",
    },
  ];

  // change
  let labReportData = [
    {
      label: "Report Submitted",
      value: report?.totalSubmittedReports,
      color: " rgba(0, 123, 255, 1)",
    },
    {
      label: "Report Not Submitted",
      value: report?.totalNotSubmittedReports,
      color: "rgba(255, 165, 0, 1)",
    },
  ];

  const totalLabReport = labReportData.reduce((prev, curr) => {
    return prev + curr.value;
  }, 0);

  let labReportPercent = labReportData.map((report) => ({
    ...report,
    percentage: ((report.value / totalLabReport) * 100).toFixed(2),
  }));

  const options: any = {
    plugins: {
      responsive: true,
      legend: {
        position: "bottom",
      },
    },
    cutout: "90%",
  };

  const attendanceFinalData = {
    labels: attendanceData.map((item) => item.label),
    datasets: [
      {
        data: attendanceData.map((item) => Math.round(item.value)),
        backgroundColor: attendanceData.map((item) => item.color),
        borderColor: attendanceData.map((item) => item.color),
        borderWidth: 0.5,
        dataVisibility: new Array(attendanceData.length).fill(true),
      },
    ],
  };

  const labReportFinalData = {
    labels: labReportData.map((item) => item.label),
    datasets: [
      {
        data: labReportData.map((item) => Math.round(item.value)),
        backgroundColor: labReportData.map((item) => item.color),
        borderColor: labReportData.map((item) => item.color),
        borderWidth: 0.5,
        dataVisibility: new Array(labReportData.length).fill(true),
      },
    ],
  };

  return (
    <section className={styles.container}>
      {selectCourse && (
        <>
          <div className={styles.child}>
            <h2 className={styles.heading}>Attendance</h2>
            <div className={styles.chartContainer}>
              <Doughnut data={attendanceFinalData} options={options} />
            </div>
            <h4 className={styles.element}>
              {attendance}% {/* Displays attendance percentage */}
            </h4>
          </div>
          <div className={styles.child}>
            <h2 className={styles.heading}>Lab Report</h2>
            <div className={styles.chartContainer}>
              <Doughnut data={labReportFinalData} options={options} />
            </div>
            <h4 className={styles.element}>
              {report?.submissionPercentage?.toFixed(2)}%{" "}
              {/* Displays lab report percentage */}
            </h4>
          </div>
        </>
      )}
    </section>
  );
};

export default DoughnutChart;
