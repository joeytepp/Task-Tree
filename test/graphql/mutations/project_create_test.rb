# frozen_string_literal: true

class ProjectCreateTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    mutation CreateProject($input: ProjectCreateInput!) {
      projectCreate(input: $input) {
        project {
          id
        }
      }
    }
  GRAPHQL

  test "project_create mutation fails when unauthenticated" do
    new_project = {
      name: "New Project",
      color: "RED"
    }

    assert_auth_works query_str, variables: { input: new_project }
  end

  test "project_create creates a new project" do
    new_project = {
      "name" => "My Project",
      "color" => "GREEN"
    }

    res = exec_query query_str, variables: { input: new_project }, context: { user_id: User.first.id }
    project_id = res.to_h["data"]["projectCreate"]["project"]["id"]

    actual_project = Project.find_by_id project_id

    assert_equal new_project, actual_project.slice(:name, :color)
  end
end
