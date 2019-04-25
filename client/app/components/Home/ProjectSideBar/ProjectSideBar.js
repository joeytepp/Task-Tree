import React from "react";
import ProjectLabel from "../ProjectLabel/ProjectLabel";

export default () => (
  <div
    css={{
      background: "white",
      margin: "20px",
      padding: "10px 15px 10px 15px",
      width: "250px",
      borderRadius: "8px",
      position: "absolute",
      top: "50px",
      bottom: "0",
      transition: "0.5s",
      opacity: "0.8",
      "&:hover": {
        opacity: "1.0"
      }
    }}
  >
    <h2>Projects</h2>
    <div css={{ marginTop: "30px" }}>
      <ProjectLabel color="black" name="All Tasks" />
    </div>
  </div>
);
