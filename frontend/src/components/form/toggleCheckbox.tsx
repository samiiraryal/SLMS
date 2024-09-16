import React, { useState } from 'react';
import styles from "./toggle-checkbox.module.css"

function ToggleSwitch() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleChange = () => {
    setIsToggled((prevState) => !prevState);
  };

  return  <label className={styles.toggleSwitch}>
  <input
    type="checkbox"
    checked={isToggled}
    onChange={handleToggleChange}
  />
  <span className={styles.slider}></span>
</label>
}

export default ToggleSwitch;
