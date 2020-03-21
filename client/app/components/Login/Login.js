import React from "react";

import LoginForm from "../LoginForm/LoginForm";

import circleLogo from "../../assets/img/circleLogo.svg";

export default props => (
  <div
    css={{
      background: "#b22222",
      minHeight: "100vh"
    }}
  >
    <div
      css={{
        textAlign: "center"
      }}
    >
      <img src={circleLogo} css={{ margin: "20px" }} />
      <h1
        css={{
          color: "white",
          fontFamily: "Cabin",
          fontSize: "50px",
          letterSpacing: "0px"
        }}
      >
        Log In
      </h1>
    </div>
    <LoginForm {...props} />
  </div>
);
