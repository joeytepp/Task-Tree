import React, { useContext } from "react";

import { ColorContext } from "../../../context/ColorContext";
import { COLOR_MAP } from "../../../constants";

import logo from "../../../assets/img/logo.svg";

export default () => {
  const { color } = useContext(ColorContext);

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        width: "100vw",
        background: COLOR_MAP[color],
        height: "min-content",
        boxShadow: "0px 1px 1px black"
      }}
    >
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "min-content auto",
          padding: "5px 50px 5px 50px"
        }}
      >
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "min-content min-content",
            textDecoration: "none",
            cursor: "pointer",
            userDrag: "none",
            userSelect: "none"
          }}
        >
          <img
            src={logo}
            css={{
              height: "32px",
              verticalAlign: "middle",
              marginRight: "5px"
            }}
          />
          <h1
            css={{
              fontFamily: "Cabin-SemiBold",
              fontSize: "32px",
              color: "white",
              textAlign: "left",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              textDecoration: "none",
              whiteSpace: "pre",
              verticalAlign: "middle"
            }}
          >
            Task Tree
          </h1>
        </div>
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
};
