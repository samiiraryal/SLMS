import React, { useContext, useEffect, useState } from "react";
import { CreateLabContext } from "../../context/lab-context.js";
import getSemesterSubjects from "../../api/get-semester-subjects.js";
import styles from "./attendance.module.css";

const SemesterGroup = ({
  group,
  course,
}: {
  group?: boolean;
  course?: boolean;
}) => {
  const [semesterCourses, setSemesterCourses] = useState<
    { id: number; subject_name: string }[]
  >([]);

  // @ts-ignore
  const {
    selectCourse,
    selectGroup,
    selectSemester,
    setSelectedCourse,
    setSelectedGroup,
    setSelectedSemester,
  } = useContext(CreateLabContext);

  const { data: semesterSubjects } = getSemesterSubjects(selectSemester);

  useEffect(() => {
    setSemesterCourses(semesterSubjects);
  }, [semesterSubjects]);

  const handleSelectGroup = (e: any) => {
    setSelectedGroup(e.target.value);
  };

  const handleSelectSemester = (e: any) => {
    setSelectedSemester(e.target.value);
  };

  const handleSelectCourse = (e: any) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <div>
      <div className={styles.semesterContainer}>
        <div>
          <h2>Select Semester</h2>
          <select
            style={{ width: "180px", padding: "6px 8px" }}
            onChange={handleSelectSemester}
            value={selectSemester}
          >
            <option value="">Select Semester</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        {group && (
          <div>
            <h2>Select Group</h2>
            <select
              style={{ width: "150px", padding: "6px 8px" }}
              onChange={handleSelectGroup}
              value={selectGroup}
            >
              <option value="Select">Select</option>
              <option value="a">A</option>
              <option value="b">B</option>
            </select>
          </div>
        )}
        {course && (
          <div>
            <h2>Select Course</h2>
            <select
              style={{ width: "150px", padding: "6px 8px" }}
              onChange={handleSelectCourse}
              value={selectCourse}
            >
              <option value="Select">Select</option>
              {semesterCourses?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.subject_name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterGroup;
