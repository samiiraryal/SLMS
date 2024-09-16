import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "../components/attendance/attendance.module.css";

const BackButton = ({ href }: { href?: string }) => {
  const navigate = useNavigate();

  return (
    <button
      style={{ padding: "4px 6px" }}
      className={styles.button}
      type="button"
      onClick={() => navigate(href ?? "/dashboard")}
    >
      <IoMdArrowRoundBack style={{ verticalAlign: "text-bottom" }} /> Back
    </button>
  );
};

export default BackButton;
