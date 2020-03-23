# frozen_string_literal: true

class ProjectsTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    query {
      projects {
        id
        name
        color
      }
    }
  GRAPHQL

  test "projects query fails for unauthenticated users" do
    assert_auth_works query_str
  end

  test "projects query lists all projects" do
    # User with only individual projects
    user = User.find_by_email("janedoe@gmail.com")
    res = exec_query query_str, context: { user_id: user.id }
    assert_projects user, res
  end

  test "projects query includes shared projects" do
    # User with individual and shared projects
    user = User.find_by_email("johnsmith@gmail.com")
    res = exec_query query_str, context: { user_id: user.id }
    assert_projects user, res
  end

  private

    # Ensure the projects from the query match those in the DB
    def assert_projects(user, res)
      expected_projects = user.projects

      actual_projects = res.to_h["data"]["projects"]
      assert_same expected_projects.length, actual_projects.length

      expected_projects.each_with_index do  |project, i|
        expected_project = project.slice(:id, :name, :color)
        actual_project = actual_projects[i]
        assert_equal expected_project, actual_project
      end
    end
end
