import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date-time.js";
import logo from "../../assets/everest-logo.jpg";
const HomePage = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Full viewport height
          backgroundColor: "#d3d3d3", // Grey background
          padding: "20px", // Padding to prevent overflow
          boxSizing: "border-box",
        }}
      >
        <div style={{fontSize: "24px"}}>{formatDate()}</div>
        <img src={logo} alt="logo" />
        <h1
          style={{
            color: "#007bff", // Blue text color
            fontSize: "2.5rem",
            marginBottom: "20px",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)", // Text shadow for depth
          }}
        >
          Smart Lab Management System
        </h1>
        <Link
          to="/login"
          style={{
            textDecoration: "none", // Remove underline for button style
            color: "#fff", // Text color is white
            backgroundColor: "#007bff", // Button color (blue)
            padding: "10px 30px",
            fontWeight: "bold",
            borderRadius: "30px", // Fully rounded button
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Button shadow
            transition: "background-color 0.3s ease", // Smooth hover effect
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Login
        </Link>
        <Link
          to="/computer-condition"
          style={{
            textDecoration: "none", // Remove underline for button style
            color: "#fff", // Text color is white
            backgroundColor: "#007bff", // Button color (blue)
            padding: "10px 30px",
            fontWeight: "bold",
            borderRadius: "30px", // Fully rounded button
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Button shadow
            transition: "background-color 0.3s ease", // Smooth hover effect
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Computer Condition
        </Link>
      </div>
    </>
  );
};

export default HomePage;
