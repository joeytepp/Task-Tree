import React, { useContext, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ApolloContext } from "react-apollo";
import uuid from "uuid";

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

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    client
      .query(resolveQueryInfoFromProject(currentProject))
      .then(res => setTasks(res.data.rootTasks));
  }, [currentProject]);

  function createNewTask() {
    if (!currentProject || !currentProject.id)
      return alert("Please select a project");

    const newTasks = [
      {
        id: uuid.v4(),
        name: "",
        projectId: currentProject.id,
        edit: true
      },
      ...tasks
    ];

    setTasks(newTasks);
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
        <TransitionGroup className="tasks">
          {tasks.map(task => (
            <CSSTransition classNames="task" timeout={500} key={task.id}>
              <Task
                root
                key={task.id}
                {...task}
                destroy={() => setTasks(tasks.filter(t => t.id !== task.id))}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
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
