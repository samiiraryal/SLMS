import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styles from "./Dashboard.module.css";
import Submission from "../submission/submission.js";
import Attendance from "../attendance/attendance.js";
import ComputerCondition from "../computerCondition/computerCondition.js";
import StudentProgress from "../studentProgress/studentProgress.js";
import PasswordRequest from "../passwordRequest/passwordRequest.js";
import CSVReader from "../csvReader/csv-reader.js";
import DoughnutChart from "./doughnut-chart.js";
import SemesterGroup from "../attendance/semester-group.js";

const Dashboard = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const refParam = searchParams.get("ref");

  const handleButtonClick = (action: any) => {
    console.log(`${action} button clicked`);
    navigate(`/dashboard?ref=${action.toLowerCase().replace(" ", "-")}`);
  };

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        {/* <div className={styles.hamburger}>
          <FaBars onClick={toggleMenuVisibility} />
        </div> */}
      </div>
      <div className={styles.content}>
        {/* {isMenuVisible && ( */}
        <div className={styles.menuContainer}>
          <div className={styles.buttonGroup}>
            <button
              className={styles.button}
              onClick={() => handleButtonClick("Attendance")}
            >
              Attendance/Submission
            </button>
            {/* <button
              className={styles.button}
              onClick={() => handleButtonClick("Submission")}
            >
              Submission
            </button> */}
            {/* <button
              className={styles.button}
              onClick={() => handleButtonClick("Computer Condition")}
            >
              Computer Condition
            </button> */}
            <button
              className={styles.button}
              onClick={() => handleButtonClick("Student Progress")}
            >
              Student Progress
            </button>
            {/* <button
              className={styles.button}
              onClick={() => handleButtonClick("Password Request")}
            >
              Password Request
            </button> */}
            <button
              className={styles.button}
              onClick={() => handleButtonClick("CSV Reader")}
            >
              CSV Reader
            </button>
          </div>
        </div>
        {/* )} */}
        <div className={styles.formContainer}>
          {refParam === "submission" ? (
            <Submission />
          ) : refParam === "attendance" ? (
            <Attendance />
          ) : refParam === "student-progress" ? (
            <StudentProgress />
          ) : refParam === "csv-reader" ? (
            <CSVReader />
          ) : (
            <>
              <SemesterGroup course={true} />
              <DoughnutChart />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
