# frozen_string_literal: true

class TaskUpdateTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    mutation UpdateTask($id: String!, $input: TaskUpdateInput!) {
      taskUpdate(id: $id, input: $input) {
        task {
          id
          name
        }
      }
    }
  GRAPHQL

  test "task_update mutation fails for unauthenticated users" do
    assert_auth_works query_str,
      variables: {
        id: Task.first.id,
        input: {
          name: "Updated task"
        }
      }

    assert_not_equal "Updated task", Task.first.name
  end

  test "task_update mutation updates a task by id" do
    task = Task.first
    user = task.project.users.first

    res = exec_query query_str,
      variables: {
        id: task.id,
        input: {
          name: "Update"
        }
      },
      context: {
        user_id: user.id
      }

    expected_task = res.to_h["data"]["taskUpdate"]["task"]
    actual_task = Task.find_by_id(task.id).slice(:id, :name)

    assert_equal "Update", expected_task["name"]
    assert_equal expected_task, actual_task
  end

  test "task_update mutation fails when a user does not have access to the task's project" do
    task = Task.find_by_name "Task one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str,
      variables: {
        id: task.id,
        input: {
          name: "Hacked updated task ;P"
        }
      },
      context: {
        user_id: user.id
      }

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
