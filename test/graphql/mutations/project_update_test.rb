# frozen_string_literal: true

class ProjectUpdateTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    mutation UpdateProject($id: String!, $input: ProjectUpdateInput!) {
      projectUpdate(id: $id, input: $input) {
        project {
          id
          name
        }
      }
    }
  GRAPHQL

  test "project_update mutation fails for unauthenticated users" do
    assert_auth_works query_str, variables: {
      id: Project.first.id,
      input: { name: "Hacked Project >:)))" }
    }

    assert_not_equal "Hacked Project >:)))", Project.first.name
  end

  test "project_update mutation updates an existing project" do
    project = Project.first
    user = project.users.first

    res = exec_query query_str,
      variables: { id: project.id, input: { name: "My updated project" } },
      context: { user_id: user.id }

    updated_project = res.to_h["data"]["projectUpdate"]["project"]
    actual_project = Project.find_by_id(updated_project["id"])

    assert_equal updated_project, actual_project.slice(:id, :name)
  end

  test "project_update fails when a user does not have access to the project" do
    project = Project.find_by_name "Project one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str,
      variables: {
        id: project.id,
        input: { name: "Hacked By Jane ;)" }
      },
      context: { user_id: user.id }

    errors = res.to_h["errors"]
    assert_same 1, errors.length

    error = errors[0]
    expected_extensions = {
      code: :NOT_FOUND
    }

    assert_equal "Could not find the project with identifier #{project.id}.", error["message"]
    assert_equal expected_extensions, error[:extensions]
  end
end
