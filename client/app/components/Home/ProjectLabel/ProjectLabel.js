import React, { useContext } from "react";
import { Mutation } from "react-apollo";

import ProjectForm from "./ProjectForm";
import ProjectDescription from "./ProjectDescription";
import { ProjectsContext } from "../../../context/ProjectsContext";
import { ColorContext } from "../../../context/ColorContext";
import { CREATE_NEW_PROJECT, UPDATE_PROJECT } from "../../../graphql/mutations";

const RED = "RED";

function createMutationVariables(props, input) {
  if (!props.saved) {
    return {
      input: {
        ...input,
        id: props.id
      }
    };
  }

  return {
    input,
    id: props.id
  };
}

export default props => {
  const { setProjects, currentProject, setCurrentProject } = useContext(
    ProjectsContext
  );
  const { setColor } = useContext(ColorContext);

  const onFormSubmitted = mutate => input => {
    mutate({
      variables: createMutationVariables(props, input)
    });

    setProjects(oldProjects => {
      const newProjects = [...oldProjects];
      const projectIndex = newProjects.findIndex(({ id }) => id === props.id);

      newProjects[projectIndex] = {
        ...props,
        ...input,
        saved: true,
        editable: false
      };

      return newProjects;
    });
  };

  const setEditable = value => e => {
    e && e.stopPropagation();
    setProjects(oldProjects => {
      const newProjects = [...oldProjects];
      const projectIndex = newProjects.findIndex(({ id }) => id === props.id);

      newProjects[projectIndex].editable = value;

      return newProjects;
    });
  };

  const removeProject = e => {
    e && e.stopPropagation();
    setProjects(projects => [...projects].filter(({ id }) => id !== props.id));
  };

  return props.editable ? (
    <Mutation mutation={props.saved ? UPDATE_PROJECT : CREATE_NEW_PROJECT}>
      {mutate => (
        <ProjectForm
          {...props}
          onSubmit={onFormSubmitted(mutate)}
          cancel={e => {
            if (props.saved) {
              setEditable(false)(e);
              setColor(props.color);
            } else {
              removeProject(e);
            }
          }}
        />
      )}
    </Mutation>
  ) : (
    <ProjectDescription
      {...props}
      edit={setEditable(true)}
      delete={removeProject}
      resetProject={() => {
        // TODO: Find a better way of representing the "ALL TASKS" projects
        if (props.id === currentProject.id) {
          setCurrentProject({ name: "All Tasks", color: RED });
          setColor(RED);
        }
      }}
      setCurrentProject={() => {
        setCurrentProject(props);
        setColor(props.color);
      }}
    />
  );
};
