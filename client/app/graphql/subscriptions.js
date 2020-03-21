import gql from "graphql-tag";

export const TASK_UPDATED = gql`
  subscription TaskUpdated($id: String!) {
    taskUpdated(id: $id) {
      name
      id
    }
  }
`;

export const ROOT_TASK_CREATED = gql`
  subscription RootTaskCreated($projectId: String!) {
    rootTaskCreated(projectId: $projectId) {
      name
      id
      project {
        id
        name
      }
    }
  }
`;
