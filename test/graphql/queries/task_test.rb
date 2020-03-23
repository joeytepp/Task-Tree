# frozen_string_literal: true

class TaskTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    query GetTaskById($id: String!){
      task(id: $id) {
        id
        name
        completed
      }
    }
  GRAPHQL

  test "task query fails for an unauthenticated user" do
    assert_auth_works query_str, variables: {
      id: Task.first.id
    }
  end

  test "task query returns a task by id" do
    task = Task.first
    user = task.project.users.first

    res = exec_query query_str,
      variables: {
        id: task.id
      },
      context: { user_id: user.id }

    actual_task = res.to_h["data"]["task"]
    expected_task = task.slice(:id, :name, :completed)

    assert_equal expected_task, actual_task
  end

  test "task query returns not found when a user doesn't have permission" do
    task = Task.find_by_name "Task one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str, variables: { id: task.id }, context: { user_id: user.id }

    errors = res.to_h["errors"]
    assert_same 1, errors.length

    error = errors[0]
    expected_extensions = { code: :NOT_FOUND }
    assert_equal "Could not find the task with identifier #{task.id}.", error["message"]
    assert_equal expected_extensions, error[:extensions]
  end
end
