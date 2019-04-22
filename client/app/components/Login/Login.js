import React from "react";

import LoginForm from "../LoginForm/LoginForm";

import styles from "./Login.scss";
import circleLogo from "../../assets/img/circleLogo.svg";

export default props => (
  <div className={styles.root}>
    <div className={styles.rootHeading}>
      <img src={circleLogo} className={styles.circleLogo} />
      <h1 className={styles.logInHeader}>Log In</h1>
    </div>
    <LoginForm {...props} />
  </div>
);
