import React, { useContext } from "react";
import { ProjectsContext } from "../../../context/ProjectsContext";

export default () => {
  const { currentProject } = useContext(ProjectsContext);

  return (
    <div css={{ marginLeft: "350px", marginTop: "20px" }}>
      <h1>{currentProject}</h1>
    </div>
  );
};
