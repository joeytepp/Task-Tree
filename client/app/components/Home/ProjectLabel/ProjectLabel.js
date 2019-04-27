import React, { useState, useEffect } from "react";
import { Mutation } from "react-apollo";

import ProjectForm from "./ProjectForm";
import ProjectDescription from "./ProjectDescription";
import { CREATE_NEW_PROJECT, UPDATE_PROJECT } from "../../../graphql/mutations";

const onFormSubmitted = (projectId, mutate) => input => {
  if (projectId) {
    return mutate({
      variables: {
        id: projectId,
        input
      }
    });
  }

  return mutate({ variables: { input } });
};

export default props => {
  const [state, setState] = useState(props);

  useEffect(() => {
    setState(props);
  }, [props]);

  return state.editable ? (
    <Mutation
      mutation={state.id ? UPDATE_PROJECT : CREATE_NEW_PROJECT}
      onCompleted={props.refetch}
      // onCompleted={data =>
      //   setState(state => ({
      //     ...state,
      //     ...data.projectCreate.project,
      //     editable: false
      //   }))
      // }
    >
      {(mutate, { data }) => (
        <ProjectForm {...state} onSubmit={onFormSubmitted(state.id, mutate)} />
      )}
    </Mutation>
  ) : (
    <ProjectDescription {...state} />
  );
};
