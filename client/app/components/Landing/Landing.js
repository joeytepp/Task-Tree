import React from "react";

import styles from "./Landing.scss";

import Header from "./Header/Header";
import CentrePiece from "./CentrePiece/CentrePiece";

export default () => {
  return (
    <div className={styles.root}>
      <Header />
      <CentrePiece />
    </div>
  );
};
