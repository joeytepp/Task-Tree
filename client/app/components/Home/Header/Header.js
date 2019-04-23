import React from "react";

import styles from "./Header.scss";
import logo from "../../../assets/img/logo.svg";

export default () => (
  <div className={styles.root}>
    <div className={styles.headerLeft}>
      <a href="./" className={styles.logoText}>
        <img src={logo} className={styles.logo} />
        <h1 className={styles.logoText}>Task Tree</h1>
      </a>
    </div>
    <div align="right">
      <form action="/logout" method="post">
        <button className={styles.logOutButton} type="submit">
          Log Out
        </button>
      </form>
    </div>
  </div>
);
