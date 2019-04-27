import React, { useContext } from "react";
import { Query } from "react-apollo";
import uuid from "uuid";

import ProjectLabel from "../ProjectLabel/ProjectLabel";
import { ProjectsContext } from "../../../context/ProjectsContext";

import { GET_ALL_PROJECTS } from "../../../graphql/queries";

import blackPlusButton from "../../../assets/img/blackPlusButton.svg";

export default () => {
  const { projects, setProjects } = useContext(ProjectsContext);

  return (
    <Query
      query={GET_ALL_PROJECTS}
      onCompleted={data => {
        setProjects(
          data.projects.map(project => ({
            ...project,
            editable: false,
            saved: true
          }))
        );
      }}
    >
      {({ loading }) => {
        return (
          <div
            css={{
              background: "white",
              margin: "20px",
              padding: "10px 15px 10px 15px",
              width: "250px",
              borderRadius: "8px",
              position: "absolute",
              top: "50px",
              bottom: "0",
              transition: "0.5s",
              opacity: "0.8",
              overflowY: "scroll",
              "&:hover": {
                opacity: "1.0"
              }
            }}
          >
            <h2>
              Projects
              <img
                src={blackPlusButton}
                css={{
                  height: "20px",
                  verticalAlign: "middle",
                  marginLeft: "10px",
                  transition: "0.5s",
                  "&:hover": {
                    transform: "rotate(90deg)"
                  }
                }}
                onClick={() => {
                  setProjects(oldProjects => {
                    const newProjects = [...oldProjects];
                    newProjects.unshift({
                      id: uuid.v4(),
                      name: "",
                      color: "RED",
                      position: 0,
                      saved: false,
                      editable: true
                    });

                    return newProjects;
                  });
                }}
              />
            </h2>
            <div css={{ marginTop: "30px" }}>
              <ProjectLabel color="BLACK" name="All Tasks" />
              {loading
                ? "Loading..."
                : projects.map((project, i) => (
                    <ProjectLabel {...project} key={i} />
                  ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
};
