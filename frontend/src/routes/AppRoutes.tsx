import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/authentication/Login/Login.js";
import About from "../pages/about/about.js";
// import Contact from "../pages/contact/contact.js";
// import Home from "../pages/home/home.js";
import AuthenticationRoute from "./AuthenticationRoutes.js";
import Dashboard from "../components/Dashboard/Dashboard.js";
import Attendance from "../components/attendance/attendance.js";
import ComputerCondition from "../components/computerCondition/computerCondition.js";
import Submission from "../components/submission/submission.js";
import StudentProgress from "../components/studentProgress/studentProgress.js";
import StudentDetail from "..//components/studentProgress/student-progress-detail/student-detail.js";
// import StudentDetail from "../components/studentDetails/studentDetails.js";
import PasswordRequests from "../components/passwordRequest/passwordRequest.js";
import CSVReader from "../components/csvReader/csv-reader.js";
import HomePage from "../components/home/home-page.js";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Default route to redirect to login */}
        <Route path="/" element={<HomePage />} />

        {/* authentication routes */}
        <Route element={<AuthenticationRoute />}>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/signup" element={<p>Signup route here</p>} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/computer-condition" element={<ComputerCondition />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/student-progress" element={<StudentProgress />} />
          <Route
            path="/student-progress/:student"
            element={<StudentDetail />}
          />
          <Route path="/password-request" element={<PasswordRequests />} />
          <Route path="/csv-reader" element={<CSVReader />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
