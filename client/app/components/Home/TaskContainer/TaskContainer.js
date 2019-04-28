import React, { useContext } from "react";
import { ProjectsContext } from "../../../context/ProjectsContext";

export default () => {
  const { currentProject } = useContext(ProjectsContext);

  return (
    <div css={{ marginLeft: "350px", marginTop: "20px" }}>
      <h1>{(currentProject && currentProject.name) || "All Tasks"}</h1>
    </div>
  );
};
