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
