import React, { useContext, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled, { css, keyframes } from "styled-components";
import { ApolloContext, Subscription } from "react-apollo";
import uuid from "uuid";

import { ProjectsContext } from "../../../context/ProjectsContext";
import { ColorContext } from "../../../context/ColorContext";
import EditButton from "./EditButton";

import { GET_TASK_WITH_CHILDREN } from "../../../graphql/queries";
import { COLOR_MAP } from "../../../constants";
import {
  COMPLETE_TASK,
  CREATE_TASK,
  UDPATE_TASK,
  DELETE_TASK
} from "../../../graphql/mutations";

import exitButton from "../../../assets/img/exitCross.svg";
import pencil from "../../../assets/img/pencil.svg";
import {
  TASK_UPDATED,
  TASK_CREATED,
  TASK_DELETED
} from "../../../graphql/subscriptions";

const caretAnimation = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 100%;
  }
`;

const Caret = styled.div`
  border-radius: 5px;
  width: 10px;
  margin-right: 5px;
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
  background: #6d6d6d;
  transition: background-color 0.3s;
  animation: ${caretAnimation} 0.2s linear;
`;

const rootCss = props => css`
  ${props.root
    ? `background: white;
        margin: 20px 50px 0px 0px;
        padding: 5px;
        border-radius: 8px;`
    : ``}
  display: grid;
  grid-template-columns: min-content 1fr;
  padding-top: 5px;

  &:hover > div > div span {
    border-color: black;
  }

  &:hover > ${Caret} {
    background: black;
  }

  &:hover #edit-buttons {
    opacity: 1;
    transition: 0.2s;
  }
`;

const Task = props => {
  const { currentProject } = useContext(ProjectsContext);
  const { client } = useContext(ApolloContext);
  const { color } = useContext(ColorContext);

  const [state, setState] = useState({
    showChildren: false,
    completed: false,
    deleted: false,
    children: [],
    name: props.name,
    edit: props.edit
  });

  useEffect(() => {
    setState(state => ({
      ...state,
      edit: props.edit,
      name: props.name
    }));
  }, [props.edit, props.name, props.completed]);

  const project = props.project || currentProject;

  function createMutationVariables(name, id, saved) {
    // Updating a saved task
    if (saved) {
      return {
        id,
        input: { name }
      };
    }

    // Creating a new task
    const input = { name, id };

    if (!props.root) {
      input.parentId = props.parentId;
      input.rootId = props.rootId || props.id;
    } else {
      input.projectId = project.id;
    }

    return { input };
  }

  // Display child tasks
  function childTasks() {
    if (!state.showChildren) return "";

    return (
      <TransitionGroup className="tasks">
        {state.children.map(child => (
          <CSSTransition classNames="task" timeout={500} key={child.id}>
            <Task
              destroy={() =>
                setState(state => ({
                  ...state,
                  children: state.children.filter(c => c.id !== child.id)
                }))
              }
              key={child.id}
              {...child}
              project={project}
              parentId={props.id}
              completed={state.completed || props.completed}
              rootId={props.rootId || props.id}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }

  // Add a new child task
  function addChild(child) {
    return setState(state => {
      const children = [child, ...state.children];
      return { ...state, children };
    });
  }

  return (
    <>
      <Subscription
        subscription={TASK_UPDATED}
        variables={{ id: props.id }}
        onSubscriptionData={({ subscriptionData }) => {
          if (subscriptionData.data.taskUpdated.completed) {
            props.destroy();
          } else {
            setState(state => ({
              ...state,
              name: subscriptionData.data.taskUpdated.name
            }));
          }
        }}
      />
      <Subscription
        subscription={TASK_DELETED}
        variables={{ id: props.id }}
        onSubscriptionData={() => props.destroy()}
      />
      {state.showChildren && (
        <Subscription
          subscription={TASK_CREATED}
          variables={{ parentId: props.id }}
          onSubscriptionData={({ subscriptionData }) => {
            addChild(subscriptionData.data.taskCreated);
          }}
        />
      )}
      <div css={rootCss(props)}>
        <Caret />
        <div>
          <div
            onClick={() => {
              if (state.edit) return;

              if (!state.showChildren) {
                client
                  .query({
                    query: GET_TASK_WITH_CHILDREN,
                    variables: { id: props.id },
                    fetchPolicy: "network-only"
                  })
                  .then(({ data }) =>
                    setState(state => ({
                      ...state,
                      children: data.task.children,
                      showChildren: true
                    }))
                  );
              } else {
                setState(state => ({
                  ...state,
                  children: [],
                  showChildren: false
                }));
              }
            }}
            css={{
              padding: "5px",
              background: "#eeeeee",
              border: "solid 1px #979797",
              borderRadius: "5px"
            }}
          >
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "1fr min-content",
                whiteSpace: "nowrap"
              }}
            >
              <div>
                <span
                  css={{
                    fontSize: "15px",
                    background:
                      COLOR_MAP[
                        resolveColor(currentProject, props.project, color)
                      ],
                    color: "white",
                    borderRadius: "5px",
                    padding: "2px 5px"
                  }}
                >
                  {project.name}
                </span>
              </div>
              <div
                id="edit-buttons"
                css={{
                  marginRight: "5px",
                  display: `${
                    state.edit || state.completed || state.deleted
                      ? "none"
                      : "grid"
                  }`,
                  opacity: "0",
                  transition: "0.2s",
                  gridTemplateColumns: "min-content min-content min-content",
                  gridColumnGap: "5px"
                }}
              >
                <EditButton
                  backgroundImage={pencil}
                  onClick={e => {
                    e.stopPropagation();
                    setState(state => ({
                      ...state,
                      edit: true,
                      saved: true
                    }));
                  }}
                />
                <EditButton
                  backgroundImage={exitButton}
                  onClick={e => {
                    e.stopPropagation();
                    setState(state => ({ ...state, deleted: true }));
                    props.destroy();
                    client.mutate({
                      mutation: DELETE_TASK,
                      variables: { id: props.id }
                    });
                  }}
                />
              </div>
            </div>
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "min-content 1fr",
                paddingTop: "5px"
              }}
            >
              {!state.completed && !state.deleted && (
                <div
                  onClick={e => {
                    e.stopPropagation();

                    if (state.edit) return;

                    setState(state => ({
                      ...state,
                      completed: true
                    }));

                    client.mutate({
                      mutation: COMPLETE_TASK,
                      variables: { id: props.id }
                    });

                    props.destroy();
                  }}
                  css={{
                    width: "14px",
                    height: "14px",
                    margin: "3px",
                    marginRight: "5px",
                    borderRadius: "50%",
                    border: "solid 1px #979797",
                    opacity: state.edit ? "0" : "1",
                    "&:hover": {
                      background: "#D6D6D6"
                    }
                  }}
                />
              )}

              {state.edit ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const name = e.currentTarget[0].value;

                    client.mutate({
                      variables: createMutationVariables(
                        name,
                        props.id,
                        state.saved
                      ),
                      mutation: state.saved ? UDPATE_TASK : CREATE_TASK
                    });

                    return setState(state => ({
                      ...state,
                      name,
                      edit: false
                    }));
                  }}
                >
                  <input
                    autoFocus={true}
                    type="text"
                    value={state.name}
                    onChange={({ value: name }) =>
                      setState(state => ({ ...state, name }))
                    }
                    css={{
                      fontSize: "20px",
                      borderRadius: "5px",
                      padding: "0px 5px",
                      width: "100%",
                      border: "none"
                    }}
                    onKeyDown={({ key }) => {
                      if (key === "Escape") {
                        if (state.saved) {
                          setState(state => ({
                            ...state,
                            name: props.name,
                            edit: false
                          }));
                        } else {
                          props.destroy();
                        }
                      }
                    }}
                  />
                </form>
              ) : (
                <span css={{ fontSize: "20px" }}>{state.name}</span>
              )}
            </div>
          </div>
          {state.showChildren && (
            <button
              css={{
                background: "black",
                color: "white",
                borderRadius: "5px"
              }}
              onClick={() =>
                addChild({
                  id: uuid.v4(),
                  edit: true,
                  name: "",
                  projectId: project.id
                })
              }
            >
              + New Task
            </button>
          )}
          {state.showChildren && childTasks(state, project)}
        </div>
      </div>
    </>
  );
};

function resolveColor(currentProject, project, currentColor) {
  if (currentProject && currentProject.name === project.name)
    return currentColor;

  return project.color;
}

export default Task;
