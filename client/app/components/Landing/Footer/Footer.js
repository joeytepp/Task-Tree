import React from "react";
import styled from "styled-components";

import logo from "../../../assets/img/circleLogoRed.svg";

const Link = styled.a`
  text-decoration: none;
  color: white;
  padding-bottom: 10px;
  white-space: pre;
  &:hover {
    color: #d6d6d6;
  }
`;

const BottomLinks = styled.div`
  text-align: left;
  width: min-content;
  display: grid;
  grid-template-columns: min-content;
  & > p {
    color: darkgrey;
  }
`;

export default () => (
  <div css={{ textAlign: "center" }}>
    <div css={{ background: "#b22222", padding: "60px 40px 60px 40px" }}>
      <p
        css={{
          margin: "0px",
          padding: "0px",
          fontFamily: "Cabin-Bold",
          fontSize: "30px",
          color: "white",
          marginBottom: "20px",
          letterSpacing: 0
        }}
      >
        See how task tree can save you time
      </p>
      <a
        href="/signup"
        css={{
          background: "white",
          color: "#b22222",
          padding: "5px 50px 5px 50px",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "20px",
          fontFamily: "Cabin-Bold",
          "&:hover": {
            boxShadow: "0px 0px 5px white"
          },
          "&:focus": {
            boxShadow: "0px 0px 10px white"
          }
        }}
      >
        GET STARTED
      </a>
    </div>
    <div css={{ background: "black", color: "white" }}>
      <div
        css={{
          width: "min-content",
          marginLeft: "auto",
          marginRight: "auto",
          display: "grid",
          gridTemplateColumns: "min-content min-content min-content",
          gridColumnGap: "120px",
          paddingTop: "20px"
        }}
      >
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "min-content min-content"
          }}
        >
          <img css={{ height: "32px", padding: "5px" }} src={logo} />
          <h1
            css={{
              paddingLeft: "2px",
              fontFamily: "Cabin-SemiBold",
              fontSize: "32px",
              color: "#ffffff",
              textAlign: "left",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              whiteSpace: "pre"
            }}
          >
            Task Tree
          </h1>
        </div>
        <BottomLinks>
          <p>Product</p>
          <Link href="#about">About</Link>
          <Link href="mailto:info@tasktree.ca">Contact</Link>
          <Link href="./">Privacy</Link>
          <Link href="./">Terms</Link>
        </BottomLinks>
        <BottomLinks>
          <p>Community</p>
          <Link href="https://github.com/joeytepp/Task-tree">GitHub</Link>
          <Link href="https://github.com/joeytepp/Task-Tree/blob/master/LICENSE">
            License
          </Link>
          <Link href="https://github.com/joeytepp/Task-Tree/blob/master/CODE_OF_CONDUCT.md">
            Code of Conduct
          </Link>
          <Link href="https://github.com/joeytepp/Task-Tree/blob/master/CONTRIBUTING.md">
            Contributing
          </Link>
        </BottomLinks>
      </div>
      <div
        css={{
          paddingTop: "20px",
          paddingBottom: "50px",
          color: "#d6d6d6"
        }}
      >
        Copyright © Task Tree 2019
      </div>
    </div>
  </div>
);
