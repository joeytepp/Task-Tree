import React, { useContext } from "react";
import { Mutation } from "react-apollo";

import ProjectForm from "./ProjectForm";
import { ProjectsContext } from "../../../context/ProjectsContext";
import ProjectDescription from "./ProjectDescription";
import { CREATE_NEW_PROJECT, UPDATE_PROJECT } from "../../../graphql/mutations";
import setEditable from "./setEditable";

export default props => {
  const { setProjects } = useContext(ProjectsContext);
  const onFormSubmitted = mutate => input => {
    mutate({
      variables: {
        id: props.id,
        input
      }
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

  return props.editable ? (
    <Mutation mutation={props.saved ? UPDATE_PROJECT : CREATE_NEW_PROJECT}>
      {mutate => (
        <ProjectForm
          {...props}
          onSubmit={onFormSubmitted(mutate)}
          cancel={setEditable(setProjects, props, false)}
        />
      )}
    </Mutation>
  ) : (
    <ProjectDescription
      {...props}
      edit={setEditable(setProjects, props, false)}
    />
  );
};
