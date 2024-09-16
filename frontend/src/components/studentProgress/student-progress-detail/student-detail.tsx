import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import getStudentDetail from "../../../api/get-student-detail.js";
import BackButton from "../../../utils/back-button.js";
import StudentDetailGraph, {
  StudentLabReportDetailGraph,
} from "./student-detail-graph.js";
import styles from "./student-detail.module.css";

const StudentDetail = () => {
  const location = useLocation();
  let symbol = location.pathname.split("/").slice(-1)?.[0];

  const { data: singlStudentData } = getStudentDetail(symbol);

  // const student = students.filter(
  //   (stu) => stu.name.toLowerCase().replace(/ /g, "-") === param.student
  // )[0];

  // const totalDays = 25; // Total number of days in the academic period
  // const attendancePercentage = ((student.attendance / totalDays) * 100).toFixed(
  //   2
  // );
  // const TotalLabReport = 20; // Total number of lab report
  // const LabReportPercentage = (
  //   (student.reportProvided / TotalLabReport) *
  //   100
  // ).toFixed(2);

  return (
    <div className={styles.studentDetail}>
      <div className={styles.headingContainer}>
        <BackButton href="/student-progress" />
        <h2>{singlStudentData?.studentName}</h2>
        <div></div>
      </div>
      <div className={styles.attendanceLabContainer}>
        <aside>
          <div className={styles.detailItem}>
            <span className={styles.label}>Total Days:</span>
            <span>
              {singlStudentData?.presentDays + singlStudentData?.absentDays}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Present Days:</span>
            <span>{singlStudentData?.presentDays}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Attendance Percentage:</span>
            <span>{singlStudentData?.attendancePercentage?.toFixed(2)}%</span>
          </div>
        </aside>
        <div className={styles.separator} />
        <aside>
          <div className={styles.detailItem}>
            <span className={styles.label}>Total Lab Report:</span>
            <span>{singlStudentData?.labReports?.totalReports}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Report Provided:</span>
            <span>{singlStudentData?.labReports?.submittedReports}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Lab Report Percentage:</span>
            <span>{singlStudentData?.labReports?.reportPercentage?.toFixed(2)}%</span>
          </div>
          {/* <StudentLabReportDetailGraph student={singlStudentData} /> */}
        </aside>
      </div>
        <StudentDetailGraph student={singlStudentData} />
    </div>
  );
};

export default StudentDetail;
