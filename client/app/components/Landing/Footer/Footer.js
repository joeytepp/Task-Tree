import React from "react";

import styles from "./Footer.scss";
import logo from "../../../assets/img/circleLogoRed.svg";

export default () => (
  <div className={styles.root}>
    <div className={styles.top}>
      <p className={styles.getStarted}>See how task tree can save you time</p>
      <a href="/signup" className={styles.getStarted}>
        GET STARTED
      </a>
    </div>
    <div className={styles.bottom}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.logo} src={logo} />
          <h1 className={styles.logo}>Task Tree</h1>
        </div>
        <div className={styles.bottomLinks}>
          <p className={styles.title}>Product</p>
          <a className={styles.link} href="#about">
            About
          </a>
          <a className={styles.link} href="mailto:info@tasktree.ca">
            Contact
          </a>
          <a className={styles.link} href="./">
            Privacy
          </a>
          <a className={styles.link} href="./">
            Terms
          </a>
        </div>
        <div className={styles.bottomLinks}>
          <p className={styles.title}>Community</p>
          <a
            className={styles.link}
            href="https://github.com/joeytepp/Task-tree"
          >
            GitHub
          </a>
          <a
            className={styles.link}
            href="https://github.com/joeytepp/Task-Tree/blob/master/LICENSE"
          >
            License
          </a>
          <a
            className={styles.link}
            href="https://github.com/joeytepp/Task-Tree/blob/master/CODE_OF_CONDUCT.md"
          >
            Code of Conduct
          </a>
          <a
            className={styles.link}
            href="https://github.com/joeytepp/Task-Tree/blob/master/CONTRIBUTING.md"
          >
            Contributing
          </a>
        </div>
      </div>
      <div className={styles.copyright}>Copyright © Task Tree 2019</div>
    </div>
  </div>
);
