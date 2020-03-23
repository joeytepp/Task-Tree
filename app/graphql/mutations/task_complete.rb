# frozen_string_literal: true

module Mutations
  class TaskComplete < BaseMutation
    include GraphqlHelper

    description "Marks a project as completed by identifier"

    type Payloads::TaskCompletePayloadType

    argument :id, String, "The identifier of the task completed.", required: true

    def resolve(id:)
      must_be_authenticated!
      root_task = ::Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by!(id: id)

      if root_task.completed?
        return { num_tasks_completed: 0 }
      end

      task_ids_to_update = accum_task_ids(root_task, completed: false)
      num_tasks_completed = Task.where(id: [task_ids_to_update]).update_all(completed: true)
      root_task.completed = true

      root_task.project.users.each do |user|
        TaskTreeSchema.subscriptions.trigger "taskUpdated", { id: root_task.id }, root_task, scope: user.id unless user.id === context[:user_id]
      end

      { task: root_task, num_tasks_completed: num_tasks_completed }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{id}."
    end
  end
end
