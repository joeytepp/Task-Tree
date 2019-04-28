import React from "react";

import Header from "./Header/Header";
import ProjectSideBar from "./ProjectSideBar/ProjectSideBar";
import ApolloProvider from "../ApolloProvider/ApolloProvider";
import { ProjectsContextProvider } from "../../context/ProjectsContext";
import TaskContainer from "./TaskContainer/TaskContainer";

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
        <TaskContainer />
      </ProjectsContextProvider>
    </div>
  </ApolloProvider>
);
