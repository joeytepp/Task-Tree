# frozen_string_literal: true

class TaskDeleteTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    mutation DeleteTask($id: String!) {
      taskDelete(id: $id) {
        deletedTaskId
        numTasksDeleted
      }
    }
  GRAPHQL

  test "task_delete mutation fails for unauthenticated users" do
    assert_auth_works query_str, variables: { id: Task.first.id }
  end

  test "task_delete mutation deletes a root task by id" do
    task = Task.find_by_name "Task one"
    user = task.project.users.first

    res = exec_query query_str,
      variables: { id: task.id },
      context: { user_id: user.id }

    num_tasks_deleted = res.to_h["data"]["taskDelete"]["numTasksDeleted"]
    assert_same 3, num_tasks_deleted

    assert_nil Task.find_by_id(task.id)
    assert_empty Task.where(root_id: task.id)
  end

  test "task_delete mutation deletes a non-root task by id" do
    task = Task.find_by_name "Task two"
    user = task.project.users.first

    res = exec_query query_str,
      variables: { id: task.id },
      context: { user_id: user.id }

    num_tasks_deleted = res.to_h["data"]["taskDelete"]["numTasksDeleted"]
    assert_same 2, num_tasks_deleted

    assert_nil Task.find_by_id(task.id)
    assert_empty Task.where(parent_id: task.id)
  end

  test "task_delete mutation deletes a task with no children by id" do
    task = Task.find_by_name "Task three"
    user = task.project.users.first

    res = exec_query query_str,
      variables: { id: task.id },
      context: { user_id: user.id }

    num_tasks_deleted = res.to_h["data"]["taskDelete"]["numTasksDeleted"]
    assert_same 1, num_tasks_deleted

    assert_nil Task.find_by_id(task.id)
    assert_empty Task.where(parent_id: task.id)
  end

  test "task_delete mutation fails for a task in a project that the user can't access" do
    task = Task.find_by_name "Task one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str,
      variables: { id: task.id },
      context: { user_id: user.id }

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
