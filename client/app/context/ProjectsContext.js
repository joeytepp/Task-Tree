import React, { createContext, useState } from "react";

export const ProjectsContext = createContext([]);

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
