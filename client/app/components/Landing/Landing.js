import React from "react";

import styles from "./Landing.scss";

import Header from "./Header/Header";
import CentrePiece from "./CentrePiece/CentrePiece";
import About from "./About/About";
import Footer from "./Footer/Footer";

export default () => {
  return (
    <>
      <div className={styles.root}>
        <Header />
        <CentrePiece />
      </div>
      <About />
      <Footer />
    </>
  );
};
