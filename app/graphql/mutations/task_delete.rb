# frozen_string_literal: true

module Mutations
  class TaskDelete < BaseMutation
    include GraphqlHelper

    description "Deletes a task by identifier."

    type Payloads::TaskDeletePayload

    argument :id, String, "The identifier of the project to delete.", required: true

    def resolve(id:)
      must_be_authenticated!
      root_task = ::Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by!(id: id)

      task_ids_to_delete = get_task_ids_to_update(root_task)
      deleted_tasks = Task.where(id: [task_ids_to_delete]).destroy_all

      root_task.project.users.each do |user|
        TaskTreeSchema.subscriptions.trigger "taskDeleted", { id: root_task.id }, root_task, scope: user.id unless user.id === context[:user_id]
      end

      { num_tasks_deleted: deleted_tasks.length, deleted_task_id: root_task.id }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{id}."
    end
  end
end
