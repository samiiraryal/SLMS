import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./studentProgess.module.css";

interface Student {
  symbolNo: string;
  studentName: string;
  semester: number;
  section: string;
  date: string;
  status: string;
  note: any;
  reportStatus: string;
  totalPresentDays: number
}

const SearchStudent = ({ student }: { student: Student[] | undefined }) => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [sortType, setSortType] = useState("name");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // @ts-ignore
    setStudentData(student);
  }, [student]);

  // const sortStudents = (type: "name" | "attendance") => {
    // @ts-ignore
    // const sorted = [...studentData].sort((a, b) => {
    //   if (type === "name") {
    //     return a.name.localeCompare(b.name);
    //   } else {
    //     return b.attendance - a.attendance;
    //   }
    // });
    // setStudentData(sorted);
    // setSortType(type);
  // };

  const handleNavigate = (name: string) => {
    navigate(`/student-progress/${name.toLowerCase().replace(/ /g, "-")}`);
  };

  const handleSearch = () => {
    if (search.length) {
      setStudentData(
        student?.filter(
          (item) =>
            item?.studentName.toLowerCase().includes(search.toLowerCase()) ||
            item?.symbolNo.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setStudentData(student);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <>
      <div className={styles.controls}>
        {/* <button onClick={() => sortStudents("name")}>Sort by Name</button>
        <button onClick={() => sortStudents("attendance")}>
          Sort by Attendance
        </button> */}
      </div>
      <div>
        <input
          name="search"
          placeholder="Search by Name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{width: "200px", height: "36px", padding: "4px 6px", margin: "16px 0"}}
        />
      </div>
      <ul className={styles.studentList}>
        {studentData?.map((student,i) => (
          <li
            key={i}
            className={styles.studentItem}
            onClick={() => handleNavigate(student.symbolNo)}
          >
            <span>
              {student.symbolNo} - {student.studentName}
            </span>
            <span>Attendance: {student.totalPresentDays}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchStudent;
