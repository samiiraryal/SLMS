import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/date-time.js";
import BackButton from "../../utils/back-button.js";
import SemesterGroup from "../attendance/semester-group.js";
import styles from "./studentProgess.module.css";
import SearchStudent from "./search-student.js";
import { CreateLabContext } from "../../context/lab-context.js";
import getStudentPresent from "../../api/get-atudents-present-data.js";

const StudentProgress = () => {
  const [sortType, setSortType] = useState("name");
  const [SStudentData, setSStudentData] = useState({
    id: "",
    subject: "",
    sem: "",
  });

  const { selectCourse, selectSemester } = useContext(CreateLabContext);

  const { data: semesterData } = getStudentPresent(selectSemester, selectCourse);

  return (
    <div className={styles.App}>
      <div className={styles.headingContainer}>
        <BackButton />
        <h2>Student Progress</h2>
        <div>{formatDate()}</div>
      </div>
      <SemesterGroup course={true} />
      <SearchStudent student={semesterData} />
    </div>
  );
};

export default StudentProgress;
