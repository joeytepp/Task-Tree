import { gql } from "apollo-boost";

export const GET_ALL_PROJECTS = gql`
  query getAllProjects {
    projects {
      id
      name
      color
      position
    }
  }
`;

export const GET_ALL_ROOT_TASKS = gql`
  query getAllRootTasks {
    rootTasks {
      id
      name
      completed
    }
  }
`;

export const GET_ROOT_TASKS_BY_PROJECT = gql`
  query getRootTasksByProject($projectId: String!) {
    rootTasks(projectId: $projectId) {
      id
      name
      completed
    }
  }
`;
