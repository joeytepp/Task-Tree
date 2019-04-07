import React from "react";

import styles from "./Landing.scss";
import logo from "../../assets/img/logo.svg";
import arrow from "../../assets/img/whiteArrow.svg";
import centrePiece from "../../assets/img/centrePiece.svg";

import MenuLink from "../MenuLink/MenuLink";
import ContentWrapper from "../ContentWrapper/ContentWrapper";

export default props => {
  return (
    <div className={styles.root}>
      {/* Header */}
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
          <a
            className={[styles.signup, styles.button].join(" ")}
            href="/signup"
          >
            Sign Up
          </a>
        </div>
      </div>
      <ContentWrapper maxWidth="700px">
        {/* TagLine */}
        <div className={styles.tagline}>
          <h1 className={styles.taglineTop}>Productivity</h1>
          <h1 className={styles.taglineBottom}>Reinvented</h1>
          <div className={styles.learnMore}>
            <a href="#about" className={styles.learnMore}>
              Learn More <img src={arrow} className={styles.arrowImg} />
            </a>
          </div>
        </div>
        {/* Centrepiece */}
        <div className={styles.centrePiece} />
      </ContentWrapper>
    </div>
  );
};
