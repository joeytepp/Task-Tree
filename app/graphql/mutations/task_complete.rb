# frozen_string_literal: true

module Mutations
  class TaskComplete < BaseMutation
    include GraphqlHelper

    description "Marks a project as completed by identifier"

    type Payloads::TaskCompletePayloadType

    argument :id, String, required: true, description: "The identifier of the task completed."

    def resolve(id:)
      must_be_authenticated!
      root_task = ::Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by!(id: id)

      if root_task.completed?
        return { num_tasks_completed: 0 }
      end

      task_ids_to_update = get_task_ids_to_update(root_task)
      num_tasks_completed = Task.where(id: [task_ids_to_update]).update_all(completed: true)

      { num_tasks_completed: num_tasks_completed }
    rescue ActiveRecord::RecordNotFound
      throw Errors::NotFoundError, "Could not find the Task with identifier #{id}"
    end

    private

      # Returns an array of ids of tasks to update given the root task
      def get_task_ids_to_update(root_task)
        task_list = []

        if root_task.root?
          task_list = [root_task, *Task.where(root_id: root_task.id, completed: false)]
        else
          task_list = Task.where(root_id: root_task.root_id, completed: false)
        end

        task_hash = create_task_hash(task_list)
        accum_task_ids_from_hash(task_hash, root_task.id)
      end


=begin
      The following method creates a hash that represents the task tree
      from the given root in the input
      For example the tree
      Task 1
      |
      |------ Task 2
      |
      |------ Task 3
                |
                |------ Task 4

      becomes

      {
        1: [2, 3],
        3: [4]
      }

      Note that only tasks with children are keys in the hash
=end
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

=begin
      The following method turns the hash representation of the task tree into
      a 1-dimensional array of ids of tasks that should be updated. This is done by looping
      through the hash and adding all children until a node with no leaves is found. The task_hash
      is the hash representation of the tree, and the task_id is the id of the root node where the
      accumulation begins
=end
      def accum_task_ids_from_hash(task_hash, task_id)
        ids_to_update = []
        if task_hash[task_id]
          ids_to_update.push(*task_hash[task_id])

          task_hash[task_id].each do |t_id|
            ids_to_update.push(t_id, *ids_to_update.push(task_hash, t_id))
          end
        end

        ids_to_update
      end
  end
end
