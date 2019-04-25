import React from "react";

import Header from "./Header/Header";
import ProjectSideBar from "./ProjectSideBar/ProjectSideBar";
import ApolloProvider from "../ApolloProvider/ApolloProvider";

export default () => (
  <ApolloProvider>
    <div
      css={{
        background: "#B22222B4",
        height: "100vh"
      }}
    >
      <Header />
      <ProjectSideBar />
    </div>
  </ApolloProvider>
);
