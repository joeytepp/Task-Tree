# frozen_string_literal: true

class RootTasksTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    query RootTaskQuery($projectId: String!) {
      rootTasks(projectId: $projectId) {
        id
        name
        completed
      }
    }
  GRAPHQL

  test "root_tasks query fails for unauthenticated users" do
    assert_auth_works query_str, variables: { projectId: Project.first.id }
  end

  test "root_tasks query returns all root tasks for a project" do
    project = Project.first
    user = project.users.first

    res = exec_query query_str, variables: { projectId: project.id }, context: { user_id: user.id }

    actual_tasks = res.to_h["data"]["rootTasks"]
    expected_tasks = project.tasks.where(root_id: nil, completed: false)

    expected_tasks.each_with_index do |task, i|
      expected_task = task.slice(:id, :name, :completed)
      actual_task = actual_tasks[i]
      assert_equal expected_task, actual_task
    end
  end
end
