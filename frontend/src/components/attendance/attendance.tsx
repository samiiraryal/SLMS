import React, { useState, useEffect, useContext } from "react";
import styles from "./attendance.module.css";
import ImportFile from "../csvReader/csv-reader.js";
import BackButton from "../../utils/back-button.js";
import SemesterGroup from "./semester-group.js";
import { formatDate } from "../../utils/date-time.js";
import ToggleButton from "../toggle-button/toggle-button.js";
import { CreateLabContext } from "../../context/lab-context.js";
import getAllStudent from "../../api/get-all-student.js";
import PostAttendance from "../../api/post-attendance.js";

const Attendance = () => {
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [comments, setComments] = useState(""); // State to manage comments
  const [formData, setFormData] = useState([]);

  const { selectSemester, selectCourse } = useContext(CreateLabContext);

  const { data: semesterStudentData } = getAllStudent(selectSemester);

  useEffect(() => {
    if (semesterStudentData) {
      setFormData(
        semesterStudentData.map((item: any) => ({
          ...item,
          isPresent: false,
          isReportSubmitted: false,
          comment: "",
          date: formatDate(),
        }))
      );
    }
  }, [semesterStudentData]);

  useEffect(() => {
    const startTime = localStorage.getItem("attendanceStartTime");
    const currentTime = new Date().getTime();

    if (startTime) {
      const elapsedTime = Math.floor(
        (currentTime - parseInt(startTime)) / 1000
      );
      const remainingTime = Math.max(900 - elapsedTime, 0);
      setTimer(remainingTime);

      if (remainingTime === 0) {
        // handleMarkAbsent();
        localStorage.removeItem("attendanceStartTime");
      }
    } else {
      localStorage.setItem("attendanceStartTime", currentTime.toString());
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          const newTime = prevTimer - 1;
          localStorage.setItem("attendanceTimer", newTime.toString());
          return newTime;
        } else {
          clearInterval(intervalId);
          alert("15 minutes have passed. Marking students as absent.");
          // handleMarkAbsent();
          localStorage.removeItem("attendanceStartTime");
          localStorage.removeItem("attendanceTimer");
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleToggleChange = (
    index: number,
    field: "isPresent" | "isReportSubmitted"
  ) => {
    setFormData((prevState) =>
      prevState.map((item, idx) =>
        idx === index ? { ...item, [field]: !item[field] } : item
      )
    );
  };

  const handleCommentChange = (index: number, value: string) => {
    setFormData((prevState) =>
      prevState.map((item, idx) =>
        idx === index ? { ...item, comment: value } : item
      )
    );
  };

  const addStudent = PostAttendance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    // Here you can do anything with the form data (e.g., send it to an API)
    const dataToSubmit = formData.map((items) => ({
      id: items.id,
      status: items.isPresent ? 1 : 2,
      semester: items.semester,
      subject_id: selectCourse,
      date: "2024/09/21", //items.date vanera rakha
      status_id: items.isReportSubmitted ? 1 : 2,
      note: items.comment,
      student_id: items.id,
    }));
    try {
      await addStudent.mutateAsync({ data: dataToSubmit });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className={styles.attendanceContainer}>
        <div className={styles.headingContainer}>
          <BackButton />
          <div className={styles.titleContainer}>
            <h2>Attendance Form</h2>
          </div>
          <div className={styles.dateTimeContainer}>
            <div>
              <b>Date:</b> {formatDate()}
            </div>
            <div>
              <b>Time Remaining:</b> {Math.floor(timer / 60)}:
              {("0" + (timer % 60)).slice(-2)}
            </div>
          </div>
        </div>
        {/* Select Semester and Subject */}
        <SemesterGroup course={true} />
        {/* table data */}
        <div style={{ marginTop: "3rem" }}>
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Symbol Number</th>
                  <th>Semester</th>
                  <th>Section</th>
                  <th>Present/Absent</th>
                  <th>Lab Report</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((item, index) => (
                  <tr key={index} className={styles.item}>
                    <td>{item.name}</td>
                    <td>{item.symbolno}</td>
                    <td>{item.semester}</td>
                    <td>{item.section}</td>
                    <td>
                      <ToggleButton
                        isToggled={item.isPresent}
                        onToggle={() => handleToggleChange(index, "isPresent")}
                      />
                    </td>
                    <td>
                      <ToggleButton
                        isToggled={item.isReportSubmitted}
                        onToggle={() =>
                          handleToggleChange(index, "isReportSubmitted")
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        value={item.comment}
                        onChange={(e) =>
                          handleCommentChange(index, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className={styles.button} type="submit">
              Save Data
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Attendance;
