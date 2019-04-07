import React from "react";

import styles from "./CentrePiece.scss";
import arrow from "../../../assets/img/whiteArrow.svg";

import ContentWrapper from "../../ContentWrapper/ContentWrapper";

export default () => (
  <ContentWrapper maxWidth="700px">
    <div className={styles.tagline}>
      <h1 className={styles.taglineTop}>Productivity</h1>
      <h1 className={styles.taglineBottom}>Reinvented</h1>
      <div className={styles.learnMore}>
        <a href="#about" className={styles.learnMore}>
          Learn More <img src={arrow} className={styles.arrowImg} />
        </a>
      </div>
    </div>
    <div className={styles.centrePiece} />
  </ContentWrapper>
);
