# frozen_string_literal: true

module GraphqlHelper
  def must_be_authenticated!
    raise Errors::UnauthenticatedError unless context[:user_id]
  end

  def must_be_owner!(user)
    raise Errors::ForbiddenError, "Must be the owner of this resource to perform this operation." unless context[:user_id] == user
  end


  # Returns an array of ids of tasks to update or delete given the root task
  def accum_task_ids(root_task, find_opts = {})
    task_list = []

    # Find the root task if the task is not root, otherwise get all the task's children
    if root_task.root?
      task_list = [root_task, *Task.where(root_id: root_task.id, **find_opts)]
    else
      task_list = Task.where(root_id: root_task.root_id, **find_opts)
    end

    task_hash = create_task_hash(task_list)
    accum_task_ids_from_hash(task_hash, root_task.id)
  end

  # The following method creates a hash that represents the task tree
  # from the given root in the input
  # For example the tree
  # Task 1
  # |
  # |------ Task 2
  # |
  # |------ Task 3
  #           |
  #           |------ Task 4

  # becomes

  # {
  #   1: [2, 3],
  #   3: [4]
  # }

  # Note that only tasks with children are keys in the hash
  def create_task_hash(task_list)
    task_hash = {}

    task_list.each do |task|
      if not task.root?
        task_hash[task.parent_id] ||= []
        task_hash[task.parent_id].push(task.id)
      end
    end

    task_hash
  end

  # The following method turns the hash representation of the task tree into
  # a 1-dimensional array of ids of tasks that should be updated. This is done by looping
  # through the hash and adding all children until a node with no leaves is found. The task_hash
  # is the hash representation of the tree, and the task_id is the id of the root node where the
  # accumulation begins
  def accum_task_ids_from_hash(task_hash, task_id)
    ids_to_update = [task_id]

    if task_hash[task_id]
      ids_to_update.push(*task_hash[task_id])
      task_hash[task_id].each do |t_id|
        ids_to_update.push(*accum_task_ids_from_hash(task_hash, t_id))
      end
    end

    ids_to_update
  end
end
