# frozen_string_literal: true

class TasksTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    query {
      tasks {
        id
        name
        completed
      }
    }
  GRAPHQL

  test "tasks query fails when unauthenticated" do
    assert_auth_works query_str
  end

  test "tasks query returns all tasks for a user" do
    user = User.first

    res = exec_query query_str, context: { user_id: user.id }

    actual_tasks = res.to_h["data"]["tasks"]
    expected_tasks = Task.joins(project: :users).where(users: { id: user.id }).where(completed: false).order(created_at: :desc)

    expected_tasks.each_with_index do |task, i|
      actual_task = actual_tasks[i]
      expected_task = task.slice(:id, :name, :completed)
      assert_equal expected_task, actual_task
    end
  end
end
