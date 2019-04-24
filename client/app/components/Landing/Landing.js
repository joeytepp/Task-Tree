import React from "react";

import Header from "./Header/Header";
import CentrePiece from "./CentrePiece/CentrePiece";
import About from "./About/About";
import Footer from "./Footer/Footer";

export default () => {
  return (
    <>
      <div
        css={{
          width: "vw",
          minHeight: "700px",
          background: "#b22222",
          padding: "10px 80px 0px 80px"
        }}
      >
        <Header />
        <CentrePiece />
      </div>
      <About />
      <Footer />
    </>
  );
};
