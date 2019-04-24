import React from "react";

import logo from "../../../assets/img/logo.svg";

export default () => (
  <div
    css={{
      display: "grid",
      gridTemplateColumns: "auto auto",
      width: "100vw",
      background: "#b22222",
      height: "min-content"
    }}
  >
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "min-content auto",
        padding: "5px 50px 5px 50px"
      }}
    >
      <a
        href="./"
        css={{
          display: "grid",
          gridTemplateColumns: "min-content min-content",
          textDecoration: "none"
        }}
      >
        <img
          src={logo}
          css={{ height: "32px", verticalAlign: "middle", marginRight: "5px" }}
        />
        <h1
          css={{
            fontFamily: "Cabin-SemiBold",
            fontSize: "32px",
            color: "white",
            textAlign: "left",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            textDecoration: "none",
            margin: "0px",
            padding: "0px",
            whiteSpace: "pre",
            verticalAlign: "middle"
          }}
        >
          Task Tree
        </h1>
      </a>
    </div>
    <div align="right">
      <form action="/logout" method="post">
        <button
          css={{
            background: "black",
            color: "white",
            verticalAlign: "middle",
            borderRadius: "8px",
            fontSize: "18px",
            padding: "6px",
            marginRight: "50px",
            marginTop: "5px"
          }}
          type="submit"
        >
          Log Out
        </button>
      </form>
    </div>
  </div>
);
