import React, { useContext, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ApolloContext, Subscription } from "react-apollo";
import uuid from "uuid";

import {
  GET_ALL_ROOT_TASKS,
  GET_ROOT_TASKS_BY_PROJECT
} from "../../../graphql/queries";
import { ProjectsContext } from "../../../context/ProjectsContext";
import ProjectsModal from "../ProjectsModal/ProjectsModal";
import Task from "../Task/Task";

import blackPlus from "../../../assets/img/blackPlusButton.svg";
import { ROOT_TASK_CREATED } from "../../../graphql/subscriptions";

export default () => {
  const { currentProject, projects } = useContext(ProjectsContext);
  const { client } = useContext(ApolloContext);

  const [tasks, setTasks] = useState([]);
  const [chooseProject, setChooseProject] = useState(false);

  useEffect(() => {
    client
      .query(resolveQueryInfoFromProject(currentProject))
      .then(res => setTasks(res.data.rootTasks));
  }, [currentProject]);

  // Updates state with new task
  function addNewTask(newTask) {
    const newTasks = [newTask, ...tasks];

    setTasks(newTasks);
  }

  // For creating a new task in the UI
  function createNewTask(project = currentProject) {
    if (!project || !project.id) return setChooseProject(true);

    addNewTask({
      id: uuid.v4(),
      name: "",
      projectId: project.id,
      project,
      edit: true
    });
  }

  function rootTaskSubscriptions() {
    if (currentProject && currentProject.id) {
      return (
        <Subscription
          subscription={ROOT_TASK_CREATED}
          variables={{
            projectId: currentProject.id
          }}
          onSubscriptionData={({ subscriptionData }) => {
            addNewTask({
              ...subscriptionData.data.rootTaskCreated,
              projectId: subscriptionData.data.rootTaskCreated.project.id
            });
          }}
        />
      );
    } else {
      return projects.map(project => (
        <Subscription
          subscription={ROOT_TASK_CREATED}
          variables={{
            projectId: project.id
          }}
          onSubscriptionData={({ subscriptionData }) => {
            addNewTask({
              ...subscriptionData.data.rootTaskCreated,
              projectId: subscriptionData.data.rootTaskCreated.project.id
            });
          }}
        />
      ));
    }
  }

  return (
    <>
      {rootTaskSubscriptions()}
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
              onClick={() => createNewTask()}
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
        <ProjectsModal
          showModal={chooseProject}
          onRequestClose={() => setChooseProject(false)}
          createNewTask={createNewTask}
        />
      </div>
    </>
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
