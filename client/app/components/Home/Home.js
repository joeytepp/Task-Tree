import React from "react";

import Header from "./Header/Header";
import ProjectSideBar from "./ProjectSideBar/ProjectSideBar";
import ApolloProvider from "../ApolloProvider/ApolloProvider";
import { ProjectsContextProvider } from "../../context/ProjectsContext";
import { ColorContextProvider } from "../../context/ColorContext";
import TaskContainer from "./TaskContainer/TaskContainer";
import Backdrop from "./Backdrop/Backdrop";

export default () => (
  <ApolloProvider>
    <ColorContextProvider>
      <Backdrop>
        <Header />
        <ProjectsContextProvider>
          <ProjectSideBar />
          <TaskContainer />
        </ProjectsContextProvider>
      </Backdrop>
    </ColorContextProvider>
  </ApolloProvider>
);
