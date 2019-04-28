import React, { createContext, useState } from "react";

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
