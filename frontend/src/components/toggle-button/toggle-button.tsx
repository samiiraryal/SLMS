import React, { useState } from "react";
import styles from "./toggle-button.module.css";

// @ts-ignore
const ToggleButton = ({ isToggled, onToggle }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleButton;
