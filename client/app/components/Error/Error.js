import React from "react";

import styles from "./Error.scss";
import errorCross from "../../assets/img/errorCross.svg";

export default props => (
  <div className={styles.errorMessage}>
    <img src={errorCross} className={styles.errorCross} />
    <span>{props.error}</span>
  </div>
);
