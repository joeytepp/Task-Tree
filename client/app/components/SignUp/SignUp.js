import React from "react";

import SignUpForm from "../SignUpForm/SignUpForm";

import logo from "../../assets/img/circleLogo.svg";

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
      <img
        src={logo}
        css={{
          width: "80px",
          padding: "10px"
        }}
      />
      <h1
        css={{
          fontFamily: "Cabin-Bold",
          fontSize: "50px",
          color: "white",
          letterSpacing: 0
        }}
      >
        Sign Up For Task Tree
      </h1>
      <h3
        css={{
          fontFamily: "Cabin-Bold",
          fontSize: "25px",
          color: "#ffffff",
          letterSpacing: 0
        }}
      >
        It's free!
      </h3>
    </div>
    <SignUpForm {...props} />
  </div>
);
