const { gql } = require("apollo-boost");

export const CREATE_NEW_PROJECT = gql`
  mutation CreateNewProject($input: ProjectCreateInput!) {
    projectCreate(input: $input) {
      project {
        id
        name
        color
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: String!, $input: ProjectUpdateInput!) {
    projectUpdate(id: $id, input: $input) {
      project {
        id
        name
        color
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: String!) {
    projectDelete(id: $id) {
      deletedProjectId
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateRootTask($input: TaskCreateInput!) {
    taskCreate(input: $input) {
      task {
        id
        name
      }
    }
  }
`;

export const COMPLETE_TASK = gql`
  mutation CompleteTask($id: String!) {
    taskComplete(id: $id) {
      task {
        id
      }
      numTasksCompleted
    }
  }
`;
