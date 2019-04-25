import React from "react";

import Header from "./Header/Header";
import ProjectSideBar from "./ProjectSideBar/ProjectSideBar";

export default () => (
  <div
    css={{
      background: "#B22222B4",
      height: "100vh"
    }}
  >
    <Header />
    <ProjectSideBar />
  </div>
);
