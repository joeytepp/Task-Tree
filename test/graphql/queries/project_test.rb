# frozen_string_literal: true

class ProjectTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
      query FindProject($id: String!) {
        project(id: $id) {
          id
          name
          color
        }
      }
  GRAPHQL

  test "project query fails without authentication" do
    assert_auth_works query_str, variables: { id: Project.first.id }
  end

  test "project query finds a project by id" do
    project = Project.first
    res = exec_query query_str, context: {
      user_id: project.users.first.id
    }, variables: {
      id: project.id
    }

    expected_res = {
      "data" => {
        "project" => project.slice(:id, :name, :color)
      }
    }

    assert_equal expected_res, res
  end

  test "project query raises a not found error when the user doesn't own the project" do
    project = Project.find_by_name "Project one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str, variables: { id: project.id }, context: { user_id: user.id }

    errors = res.to_h["errors"]
    assert_same 1, errors.length

    error = errors[0]
    expected_extensions = { code: :NOT_FOUND }
    assert_equal "Could not find the project with identifier #{project.id}.", error["message"]
    assert_equal expected_extensions, error[:extensions]
  end
end
