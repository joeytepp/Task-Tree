# frozen_string_literal: true

class TaskCompleteTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    mutation CompleteTask($id: String!) {
      taskComplete(id: $id) {
        task {
          id
          completed
        }
        numTasksCompleted
      }
    }
  GRAPHQL

  test "task_complete mutation fails for unauthenticated users" do
    task = Task.where(completed: false).first
    assert_auth_works query_str, variables: { id: task.id }
    assert_not Task.find_by_id(task.id).completed
  end

  test "task_complete mutation completes a task with no children" do
    task = Task.find_by_name "Task three"
    user = task.project.users.first

    res = exec_query query_str, variables: { id: task.id }, context: { user_id: user.id }
    num_tasks_completed = res.to_h["data"]["taskComplete"]["numTasksCompleted"]

    assert_same 1, num_tasks_completed
    assert Task.find_by_id(task.id).completed
  end

  test "task_complete mutation completes a non-root task with children" do
    task = Task.find_by_name "Task two"
    user = task.project.users.first

    res = exec_query query_str, variables: { id: task.id }, context: { user_id: user.id }
    num_tasks_completed = res.to_h["data"]["taskComplete"]["numTasksCompleted"]

    assert_same 2, num_tasks_completed
    assert Task.find_by_id(task.id).completed
    assert_empty Task.where(parent_id: task.id, completed: false)
  end

  test "task_complete mutation completes a root task with children" do
    task = Task.find_by_name "Task one"
    user = task.project.users.first

    res = exec_query query_str, variables: { id: task.id }, context: { user_id: user.id }
    num_tasks_completed = res.to_h["data"]["taskComplete"]["numTasksCompleted"]

    assert_same 3, num_tasks_completed
    assert Task.find_by_id(task.id).completed
    assert_empty Task.where(root_id: task.id, completed: false)
  end

  test "task_complete mutation does nothing for a task that is already completed" do
    task = Task.where(completed: true).first
    user = task.project.users.first

    res = exec_query query_str, variables: { id: task.id }, context: { user_id: user.id }
    num_tasks_completed = res.to_h["data"]["taskComplete"]["numTasksCompleted"]

    assert_same 0, num_tasks_completed
    assert Task.find_by_id(task.id).completed
  end

  test "task_complete mutation fails for users who do not have access to the task" do
    task = Task.find_by_name "Task one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str, variables: { id: task.id }, context: { user_id: user.id }
    errors = res.to_h["errors"]

    assert_same 1, errors.length

    error = errors[0]
    expected_extensions = {
      code: :NOT_FOUND
    }

    assert_equal "Could not find the task with identifier #{task.id}.", error["message"]
    assert_equal expected_extensions, error[:extensions]
  end
end
