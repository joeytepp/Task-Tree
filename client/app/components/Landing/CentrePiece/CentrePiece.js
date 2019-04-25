import React from "react";
import styled from "styled-components";

import arrow from "../../../assets/img/whiteArrow.svg";
import centrePiece from "../../../assets/img/centrePiece.svg";

import ContentWrapper from "../../ContentWrapper/ContentWrapper";

const ArrowImg = styled.img`
  height: 10px;
  padding-left: 5px;
  transition: 0.5s;
`;

const learnMoreHoverKey = `&:hover ${ArrowImg}`;

export default () => (
  <ContentWrapper maxWidth="700px">
    <div
      css={{
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "left",
        width: "60%",
        position: "relative",
        zIndex: 0
      }}
    >
      <h1
        css={{
          fontFamily: "Cabin-SemiBold",
          fontSize: "70px",
          lineHeight: "70px",
          color: "white",
          letterSpacing: "2px",
          textAlign: "left",
          margin: "75px 0px 0px 0px",
          padding: "0px"
        }}
      >
        Productivity
      </h1>
      <h1
        css={{
          fontFamily: "Cabin-SemiBold",
          fontSize: "70px",
          lineHeight: "70px",
          color: "#d8d8d8",
          letterSpacing: "2px",
          textAlign: "left"
        }}
      >
        Reinvented
      </h1>
      <div css={{ marginTop: "30px" }}>
        <a
          href="#about"
          css={{
            paddingTop: "30px",
            color: "white",
            textDecoration: "none",
            paddingLeft: "4px",
            [learnMoreHoverKey]: {
              paddingLeft: "10px"
            }
          }}
        >
          Learn More <ArrowImg src={arrow} />
        </a>
      </div>
    </div>
    <div
      css={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "-120px",
        width: "auto",
        backgroundImage: `url(${centrePiece})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% auto",
        height: "500px",
        width: "550px",
        position: "relative",
        pointerEvents: "none"
      }}
    />
  </ContentWrapper>
);
