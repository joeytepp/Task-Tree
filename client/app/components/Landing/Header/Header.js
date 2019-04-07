import React from "react";

import styles from "./Header.scss";
import logo from "../../../assets/img/logo.svg";

import MenuLink from "../MenuLink/MenuLink";

export default () => (
  <div className={styles.header}>
    <div className={styles.headerLeft} align="left">
      <img src={logo} className={styles.logoImg} />
      <a href="./" className={styles.logoText}>
        Task Tree
      </a>
    </div>
    <div className={styles.headerRight} align="right">
      <div />
      <MenuLink name="About" link="#about" />
      <MenuLink name="Contact" link="mailto:info@tasktree.ca" />
      <a className={[styles.login, styles.button].join(" ")} href="/login">
        Log In
      </a>
      <a className={[styles.signup, styles.button].join(" ")} href="/signup">
        Sign Up
      </a>
    </div>
  </div>
);
