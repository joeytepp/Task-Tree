import React from "react";

import styles from "./MenuLink.scss";

export default ({ name, link }) => (
  <div className={styles.root}>
    <a className={styles.link} href={link}>
      {name}
    </a>
    <div className={styles.caret} />
  </div>
);
