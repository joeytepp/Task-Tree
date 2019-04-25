import { gql } from "apollo-boost";

export const GET_ALL_PROJECTS = gql`
  query getAllProjects {
    projects {
      ID
      name
      color
      position
    }
  }
`;
