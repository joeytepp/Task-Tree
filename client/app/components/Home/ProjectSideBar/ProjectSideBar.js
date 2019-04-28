import React, { useContext } from "react";
import { Query } from "react-apollo";
import uuid from "uuid";

import ProjectLabel from "../ProjectLabel/ProjectLabel";
import { ProjectsContext } from "../../../context/ProjectsContext";

import { GET_ALL_PROJECTS } from "../../../graphql/queries";

import blackPlusButton from "../../../assets/img/blackPlusButton.svg";
import SideBarLoading from "./SideBarLoading";

export default () => {
  const { projects, setProjects, currentProject } = useContext(ProjectsContext);

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
              overflowY: "scroll"
            }}
          >
            <h2>
              Projects
              <img
                src={blackPlusButton}
                height="20px"
                css={{
                  height: "20px",
                  verticalAlign: "middle",
                  marginLeft: "10px",
                  transition: "transform 0.5s",
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
              {loading ? (
                <SideBarLoading />
              ) : (
                <>
                  <ProjectLabel
                    color="RED"
                    name="All Tasks"
                    selected={!currentProject || !currentProject.id}
                  />
                  {projects.map((project, i) => (
                    <ProjectLabel
                      {...project}
                      key={i}
                      selected={
                        currentProject && currentProject.id === project.id
                      }
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        );
      }}
    </Query>
  );
};
