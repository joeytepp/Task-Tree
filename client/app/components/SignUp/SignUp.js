import React from "react";

import SignUpForm from "../SignUpForm/SignUpForm";

import styles from "./SignUp.scss";
import logo from "../../assets/img/circleLogo.svg";

export default props => (
  <div className={styles.root}>
    <div className={styles.rootHead}>
      <img src={logo} className={styles.logo} />
      <h1 className={styles.heading}>Sign Up For Task Tree</h1>
      <h3 className={styles.subHeading}>It's free!</h3>
    </div>
    <SignUpForm />
  </div>
);
