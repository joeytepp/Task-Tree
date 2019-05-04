import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";

import { COLOR_MAP } from "../../../constants";
import { ProjectsContext } from "../../../context/ProjectsContext";
import { ApolloContext } from "react-apollo";
import { GET_TASK_WITH_CHILDREN } from "../../../graphql/queries";

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

  &:hover > div > * {
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
    children: []
  });

  const project = props.project || currentProject;

  return (
    <div css={rootCss(props)}>
      <Caret />
      <div>
        <div
          onClick={() =>
            client
              .query({
                query: GET_TASK_WITH_CHILDREN,
                variables: { id: props.id }
              })
              .then(({ data }) =>
                setState(state => ({
                  ...state,
                  children: data.task.children
                }))
              )
          }
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
              <div
                css={{
                  width: "14px",
                  height: "14px",
                  margin: "3px",
                  marginRight: "5px",
                  borderRadius: "50%",
                  border: "solid 1px #979797"
                }}
              />
              <span css={{ fontSize: "20px" }}>{props.name}</span>
            </div>
          </div>
        </div>
        {state.children.map(child => (
          <Task {...child} project={project} />
        ))}
        <button
          css={{ background: "black", color: "white", borderRadius: "5px" }}
        >
          + New Task
        </button>
      </div>
    </div>
  );
};

export default Task;
