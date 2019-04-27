import React from "react";
import styled from "styled-components";

const Caret = styled.div`
  height: 2px;
  width: 0%;
  margin-left: auto;
  margin-right: auto;
  background: white;
  transition: 0.5s;
`;

const caretHoverKey = `&:hover ${Caret}`;

export default ({ name, link }) => (
  <div
    css={{
      margin: "5px 5px 5px 5px",
      textAlign: "center",
      [caretHoverKey]: {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        transition: "0.5s"
      }
    }}
  >
    <a
      css={{
        color: "white",
        textDecoration: "none",
        background: "#b22222"
      }}
      href={link}
    >
      {name}
    </a>
    <Caret />
  </div>
);
