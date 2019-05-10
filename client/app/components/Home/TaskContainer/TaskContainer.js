import uuid from "uuid";
import React, { useContext, useState, useEffect } from "react";
import { Query, ApolloContext } from "react-apollo";

import {
  GET_ALL_ROOT_TASKS,
  GET_ROOT_TASKS_BY_PROJECT
} from "../../../graphql/queries";
import { ProjectsContext } from "../../../context/ProjectsContext";
import Task from "../Task/Task";

import blackPlus from "../../../assets/img/blackPlusButton.svg";

export default () => {
  const { currentProject } = useContext(ProjectsContext);
  const { client } = useContext(ApolloContext);

  const [state, setState] = useState({
    tasks: [],
    loading: true
  });

  useEffect(() => {
    setState({ loading: true, tasks: [] });

    client
      .query(resolveQueryInfoFromProject(currentProject))
      .then(res => setState({ loading: false, tasks: res.data.rootTasks }));
  }, [currentProject]);

  function createNewTask() {
    const tasks = [...state.tasks];

    if (!currentProject || !currentProject.id)
      return alert("Please select a project");

    tasks.push({
      id: uuid.v4(),
      name: "",
      projectId: currentProject.id,
      edit: true
    });

    setState(state => ({ ...state, tasks }));
  }

  return (
    <div>
      <div
        css={{
          marginLeft: "350px",
          marginTop: "70px",
          paddingBottom: "20px"
        }}
      >
        <h1 css={{ verticalAlign: "middle" }}>
          {(currentProject && currentProject.name) || "All Tasks"}{" "}
          <img
            src={blackPlus}
            onClick={createNewTask}
            css={{
              transition: "transform 0.5s",
              height: "1em",
              marginLeft: "10px",
              verticalAlign: "middle",
              "&:hover": {
                transform: "rotate(90deg)"
              }
            }}
          />
        </h1>
        {state.tasks.map(task => (
          <Task root {...task} />
        ))}
      </div>
    </div>
  );
};

function resolveQueryInfoFromProject(project) {
  return {
    query:
      project && project.id ? GET_ROOT_TASKS_BY_PROJECT : GET_ALL_ROOT_TASKS,
    variables: project && project.id ? { projectId: project.id } : {},
    fetchPolicy: "network-only"
  };
}
