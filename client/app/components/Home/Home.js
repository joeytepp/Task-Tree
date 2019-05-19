import React from "react";
import { ApolloProvider } from "react-apollo";

import { ProjectsContextProvider } from "../../context/ProjectsContext";
import { ColorContextProvider } from "../../context/ColorContext";
import ProjectSideBar from "./ProjectSideBar/ProjectSideBar";
import TaskContainer from "./TaskContainer/TaskContainer";
import Backdrop from "./Backdrop/Backdrop";
import Header from "./Header/Header";
import createClient from "../../graphql/client";

const Home = (_, railsContext) => {
  const client = createClient(railsContext);

  return (
    <ApolloProvider client={client}>
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
};

export default Home;
