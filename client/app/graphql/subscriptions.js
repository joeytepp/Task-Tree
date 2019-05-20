import gql from "graphql-tag";

export const TASK_UPDATED = gql`
  subscription TaskUpdated($id: String!) {
    taskUpdated(id: $id) {
      name
      id
    }
  }
`;
