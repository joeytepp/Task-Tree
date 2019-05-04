import React, { useContext } from "react";
import { Query } from "react-apollo";

import {
  GET_ALL_ROOT_TASKS,
  GET_ROOT_TASKS_BY_PROJECT
} from "../../../graphql/queries";
import { ProjectsContext } from "../../../context/ProjectsContext";
import Task from "../Task/Task";

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
            {data.rootTasks &&
              data.rootTasks.map(task => <Task root {...task} />)}
          </div>
        </div>
      )}
    </Query>
  );
};
