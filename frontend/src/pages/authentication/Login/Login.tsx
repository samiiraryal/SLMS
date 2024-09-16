import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import LoginStudent from "../../../api/login.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = LoginStudent();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await login.mutateAsync({ data: { email, password } });
      console.log(response, "response from login");
      // Now you can use response.data directly here if needed
      navigate("/dashboard")
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
      
       
        <div className={styles.submit_container}>
          <button type="submit" className={styles.button}>
            Login
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default Login;
