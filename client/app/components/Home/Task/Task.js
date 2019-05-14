import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import uuid from "uuid";

import { COLOR_MAP } from "../../../constants";
import { ProjectsContext } from "../../../context/ProjectsContext";
import { ApolloContext } from "react-apollo";
import { GET_TASK_WITH_CHILDREN } from "../../../graphql/queries";
import { CREATE_TASK } from "../../../graphql/mutations";
import CheckMark from "../CheckMark/CheckMark";

const Caret = styled.div`
  border-radius: 5px;
  width: 10px;
  margin-right: 5px;
  background: #6d6d6d;
  transition: background-color 0.3s;
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
`;

const Task = props => {
  const { currentProject } = useContext(ProjectsContext);
  const { client } = useContext(ApolloContext);

  const [state, setState] = useState({
    showChildren: false,
    children: [],
    name: props.name,
    edit: props.edit
  });

  useEffect(() => {
    setState({ edit: props.edit, name: props.name });
  }, [props.edit, props.name]);

  const project = props.project || currentProject;

  function createTaskInput(name) {
    const input = { name };

    if (!props.root) {
      input.parentId = props.parentId;
      input.rootId = props.rootId || props.id;
    } else {
      input.projectId = project.id;
    }

    return input;
  }

  function childTasks() {
    if (!state.showChildren) return "";

    return state.children.map(child => (
      <Task
        {...child}
        project={project}
        parentId={props.id}
        rootId={props.rootId || props.id}
      />
    ));
  }

  return (
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
          <div>
            <span
              css={{
                fontSize: "15px",
                background: COLOR_MAP[project.color],
                color: "white",
                borderRadius: "5px",
                padding: "2px 5px",
                lineHeight: "20px"
              }}
            >
              {project.name}
            </span>
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "min-content 1fr",
                paddingTop: "5px",
                height: "40px"
              }}
            >
              {/* <div
                css={{
                  width: "14px",
                  height: "14px",
                  margin: "3px",
                  marginRight: "5px",
                  borderRadius: "50%",
                  border: "solid 1px #979797",
                  opacity: state.edit ? "0" : "1"
                }}
              /> */}
              <CheckMark color={COLOR_MAP[project.color]} size={"14px"} />
              {state.edit ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const name = e.currentTarget[0].value;

                    client.mutate({
                      variables: {
                        input: createTaskInput(name)
                      },
                      mutation: CREATE_TASK
                    });

                    return setState(state => ({ ...state, name, edit: false }));
                  }}
                >
                  <input
                    autoFocus={true}
                    type="text"
                    placeholder="New Task"
                    css={{
                      fontSize: "20px",
                      borderRadius: "5px",
                      padding: "0px 5px",
                      width: "100%",
                      border: "none"
                    }}
                  />
                </form>
              ) : (
                <span css={{ fontSize: "20px" }}>{state.name}</span>
              )}
            </div>
          </div>
        </div>
        {state.showChildren && (
          <button
            css={{ background: "black", color: "white", borderRadius: "5px" }}
            onClick={() =>
              setState(state => {
                const children = [...state.children];

                children.push({
                  id: uuid.v4(),
                  edit: true,
                  name: "",
                  projectId: project.id
                });

                return { ...state, children };
              })
            }
          >
            + New Task
          </button>
        )}
        {state.showChildren && childTasks(state, project)}
      </div>
    </div>
  );
};

export default Task;
