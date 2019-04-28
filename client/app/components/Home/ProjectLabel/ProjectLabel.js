import React, { useContext } from "react";
import { Mutation } from "react-apollo";

import ProjectForm from "./ProjectForm";
import { ProjectsContext } from "../../../context/ProjectsContext";
import ProjectDescription from "./ProjectDescription";
import { CREATE_NEW_PROJECT, UPDATE_PROJECT } from "../../../graphql/mutations";

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
  const { setProjects, setCurrentProject } = useContext(ProjectsContext);

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
    e.stopPropagation();
    setProjects(oldProjects => {
      const newProjects = [...oldProjects];
      const projectIndex = newProjects.findIndex(({ id }) => id === props.id);

      newProjects[projectIndex].editable = value;

      return newProjects;
    });
  };

  const removeProject = e => {
    e.stopPropagation();
    setProjects(projects => [...projects].filter(({ id }) => id !== props.id));
  };

  return props.editable ? (
    <Mutation mutation={props.saved ? UPDATE_PROJECT : CREATE_NEW_PROJECT}>
      {mutate => (
        <ProjectForm
          {...props}
          onSubmit={onFormSubmitted(mutate)}
          cancel={props.saved ? setEditable(false) : removeProject}
        />
      )}
    </Mutation>
  ) : (
    <ProjectDescription
      {...props}
      edit={setEditable(true)}
      delete={removeProject}
      setCurrentProject={() => setCurrentProject(props.id)}
    />
  );
};
