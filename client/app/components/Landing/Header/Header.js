import React from "react";
import styled from "styled-components";

import logo from "../../../assets/img/logo.svg";

import MenuLink from "../MenuLink/MenuLink";

const LinkButton = styled.a`
  white-space: nowrap;
  text-decoration: none;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  transition: 0.5s;
  ${props =>
    props.login
      ? `
    border-color: white;
    color: white;
    &:hover {
      border-color: #d8d8d8;
      background: #d8d8d8;
      color: #b22222;
    }
    `
      : `
    background: white;
  border-color: white;
  color: #b22222;
  &:hover {
    background: black;
    border-color: black;
    color: white;
  }
  `}
`;

export default () => (
  <div
    css={{
      display: "grid",
      gridTemplateColumns: "auto auto"
    }}
  >
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "min-content auto"
      }}
      align="left"
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
          css={{ paddingRight: "10px", paddingTop: "2px", height: "32px" }}
        />
        <p
          css={{
            fontFamily: "Cabin-SemiBold",
            fontSize: "32px",
            color: "#ffffff",
            textAlign: "left",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            textDecoration: "none",
            margin: "0px",
            padding: "0px",
            whiteSpace: "pre"
          }}
        >
          Task Tree
        </p>
      </a>
    </div>
    <div
      css={{
        display: "grid",
        gridTemplateColumns:
          "1fr min-content min-content min-content min-content",
        gridColumnGap: "10px",
        height: "20px"
      }}
      align="right"
    >
      <div />
      <MenuLink name="About" link="#about" />
      <MenuLink name="Contact" link="mailto:info@tasktree.ca" />
      <LinkButton href="/login" login>
        Log In
      </LinkButton>
      <LinkButton href="/signup">Sign Up</LinkButton>
    </div>
  </div>
);
