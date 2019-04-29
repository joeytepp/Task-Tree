import React, { useContext } from "react";
import { Query } from "react-apollo";

import {
  GET_ALL_ROOT_TASKS,
  GET_ROOT_TASKS_BY_PROJECT
} from "../../../graphql/queries";
import { ProjectsContext } from "../../../context/ProjectsContext";

export default () => {
  const { currentProject } = useContext(ProjectsContext);

  return (
    <Query
      query={
        currentProject && currentProject.id
          ? GET_ROOT_TASKS_BY_PROJECT
          : GET_ALL_ROOT_TASKS
      }
      variables={
        currentProject && currentProject.id
          ? { projectId: currentProject.id }
          : {}
      }
    >
      {({ data = [] }) => (
        <div>
          <div css={{ marginLeft: "350px", marginTop: "20px" }}>
            <h1>{(currentProject && currentProject.name) || "All Tasks"}</h1>
          </div>
          {data.rootTasks &&
            data.rootTasks.map(i => {
              console.log(i);
              return <div css={{ marginLeft: "500px" }}>{i.id}</div>;
            })}
        </div>
      )}
    </Query>
  );
};
