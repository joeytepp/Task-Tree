import React, { createContext, useState, useEffect, useContext } from "react";

import { ColorContext } from "./ColorContext";

export const ProjectsContext = createContext([]);

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  return (
    <ProjectsContext.Provider
      value={{ projects, setProjects, currentProject, setCurrentProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
