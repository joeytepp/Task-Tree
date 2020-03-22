import gql from "graphql-tag";

export const TASK_UPDATED = gql`
  subscription TaskUpdated($id: String!) {
    taskUpdated(id: $id) {
      id
      name
      completed
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
        color
      }
    }
  }
`;

export const TASK_CREATED = gql`
  subscription TaskCreated($parentId: String!) {
    taskCreated(parentId: $parentId) {
      name
      id
      project {
        id
        name
      }
    }
  }
`;

export const TASK_DELETED = gql`
  subscription TaskDeleted($id: String!) {
    taskDeleted(id: $id) {
      id
    }
  }
`;
