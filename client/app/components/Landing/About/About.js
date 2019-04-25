import React from "react";
import { css } from "styled-components";

import taskList from "../../../assets/img/taskList.svg";
import projects from "../../../assets/img/projects.svg";
import openSource from "../../../assets/img/openSource.svg";

const sellingPointCss = css({
  textAlign: "left"
});

const titleCss = css({
  fontFamily: "Cabin-SemiBold",
  fontSize: "15px",
  color: "black",
  letterSpacing: 0,
  textAlign: "left",
  marginTop: "5px"
});

const subtitleCss = css({
  fontFamily: "Cabin-Regular",
  fontSize: "15px",
  color: "424242",
  letterSpacing: 0,
  textAlign: "left",
  marginTop: "-10px",
  width: "80%"
});

export default () => (
  <div
    id="about"
    css={{
      paddingTop: "30px",
      paddingBottom: "80px"
    }}
  >
    <div>
      <h1
        css={{
          fontFamily: "Cabin-SemiBold",
          fontSize: "30px",
          color: "black",
          letterSpacing: "1px",
          textAlign: "left",
          textAlign: "center"
        }}
      >
        A new way to organize tasks
      </h1>
      <p
        css={{
          fontFamily: "Cabin-Regular",
          fontSize: "18px",
          color: "#000000",
          letterSpacing: 0,
          textAlign: "center",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        Task Tree lets you seperate the high level from the low level to get a
        bird’s eye view of what you want to accomplish. Organize your tasks
        faster and better.
      </p>
    </div>
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        maxWidth: "1000px",
        paddingLeft: "50px",
        paddingRight: "50px",
        "& img": {
          width: "80%",
          textAlign: "left"
        }
      }}
    >
      <div css={sellingPointCss}>
        <img src={taskList} />
        <p css={titleCss}>Break it down</p>
        <p css={subtitleCss}>
          Break any large task into smaller ones with sub tasks
        </p>
      </div>
      <div css={sellingPointCss}>
        <img src={projects} />
        <p css={titleCss}>Make your own projects</p>
        <p css={subtitleCss}>
          Distribute your tasks across an unlimited amount of projects
        </p>
      </div>
      <div css={sellingPointCss}>
        <img src={openSource} />
        <p css={titleCss}>Free and open source</p>
        <p css={subtitleCss}>
          At Task Tree we have nothing to hide. See for yourself on{" "}
          <a
            css={{
              color: "black"
            }}
            href="https://github.com/joeytepp/Task-tree"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  </div>
);
