import React from "react";

import Header from "./Header/Header";
import ProjectSideBar from "./ProjectSideBar/ProjectSideBar";
import ApolloProvider from "../ApolloProvider/ApolloProvider";
import { ProjectsContextProvider } from "../../context/ProjectsContext";

export default () => (
  <ApolloProvider>
    <div
      css={{
        background: "#B22222B4",
        height: "100vh"
      }}
    >
      <Header />
      <ProjectsContextProvider>
        <ProjectSideBar />
      </ProjectsContextProvider>
    </div>
  </ApolloProvider>
);
