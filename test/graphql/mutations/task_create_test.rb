# frozen_string_literal: true

class TaskCreateTest < ActiveSupport::TestCase
  query_str = <<-GRAPHQL
    mutation CreateTask($input: TaskCreateInput!) {
      taskCreate(input: $input) {
        task {
          id
        }
      }
    }
  GRAPHQL

  test "task_create mutation fails for unauthenticated users" do
    assert_auth_works query_str,
    variables: {
      input: {
        name: "new task",
        projectId: Project.first.id,
      }
    }

    assert_nil Task.find_by_name("new task")
  end

  test "task_create mutation works for creating root tasks" do
    project = Project.first
    user = project.users.first

    res = exec_query query_str,
      variables: {
        input: {
          name: "new task",
          projectId: project.id
        }
      },
      context: {
        user_id: user.id
      }

    new_task_id = res.to_h["data"]["taskCreate"]["task"]["id"]
    expected_task = {
      "id" => new_task_id,
      "name" => "new task"
    }
    actual_task = Task.find_by_id(new_task_id).slice(:id, :name)

    assert_equal expected_task, actual_task
  end

  test "task_create mutation works for creating child tasks" do
    task = Task.where(root_id: nil).first
    user = task.project.users.first

    res = exec_query query_str,
      variables: {
        input: {
          name: "newer task",
          rootId: task.id,
          parentId: task.id
        }
      },
      context: { user_id: user.id }

    new_task_id = res.to_h["data"]["taskCreate"]["task"]["id"]
    assert_not nil, new_task_id

    expected_task = {
      "id" => new_task_id,
      "root_id" => task.id,
      "parent_id" => task.id,
      "name" => "newer task"
    }
    actual_task = Task.find_by_id(new_task_id).slice(:id, :root_id, :parent_id, :name)

    assert_equal expected_task, actual_task
  end

  test "task_create mutation fails for root tasks when users don't have access to the project" do
    project = Project.find_by_name "Project one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str,
      variables: {
        input: {
          name: "forbidden task",
          projectId: project.id
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

    assert_equal "Could not find the project with identifier #{project.id}.", error["message"]
    assert_equal expected_extensions, error[:extensions]
    assert_nil Task.find_by_name "forbidden task"
  end

  test "task_create mutation fails for child tasks when users don't have access to the parent" do
    task = Task.find_by_name "Task one"
    user = User.find_by_email "janedoe@gmail.com"

    res = exec_query query_str,
      variables: {
        input: {
          name: "forbidden task",
          rootId: task.id,
          parentId: task.id
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

    assert_equal "Could not find the project with identifier #{task.project.id}.", error["message"]
    assert_equal expected_extensions, error[:extensions]
    assert_nil Task.find_by_name "forbidden task"
  end
end
