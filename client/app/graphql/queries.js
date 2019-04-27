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
