import React from "react";

import styles from "./Footer.scss";

export default () => (
  <div className={styles.root}>
    <div className={styles.top}>
      <p className={styles.getStarted}>See how task tree can save you time</p>
      <a href="/signup" className={styles.getStarted}>
        GET STARTED
      </a>
    </div>
    <div className={styles.bottom}>
      <div className={styles.bottomLinks}>
        <div>
          <a href="#about">About</a>
        </div>
        <div>
          <a href="mailto:info@tasktree.ca">Contact</a>
        </div>
        <div>
          <a href="https://github.com/joeytepp/Task-Tree/blob/master/LICENSE">
            License
          </a>
        </div>
        <div>
          <a href="https://github.com/joeytepp/Task-Tree/blog/master/CONTRIBUTING.md">
            Contributing
          </a>
        </div>
      </div>
      <div className={styles.copyright}>Copyright © Task Tree 2019</div>
    </div>
  </div>
);
