# frozen_string_literal: true

class ProjectDeleteTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    mutation DeleteProject($id: String!) {
      projectDelete(id: $id) {
        deletedProjectId
      }
    }
  GRAPHQL

  test "project_delete mutation fails for unauthenticated users" do
    project_id = Project.first.id
    assert_auth_works query_str, variables: { id: project_id }

    assert_not_equal nil, Project.find_by_id(project_id)
  end

  test "project_delete mutation deletes a project by id" do
    project = Project.first
    user = project.users.first

    res = exec_query query_str, variables: { id: project.id }, context: { user_id: user.id }
    deleted_project_id = res.to_h["data"]["projectDelete"]["deletedProjectId"]

    deleted_project = Project.find_by_id deleted_project_id
    assert_nil deleted_project
  end

  test "project_delete mutation fails for users without access to the project" do
    project = Project.find_by_name "Project one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str, variables: { id: project.id }, context: { user_id: user.id }

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
