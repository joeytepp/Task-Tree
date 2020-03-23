# frozen_string_literal: true

module Mutations
  class TaskUpdate < BaseMutation
    include GraphqlHelper

    description "Updates a task by identifier."

    argument :id, String, "The identifier of the project.", required: true
    argument :input, Inputs::TaskUpdateInputType, "The task to be updated.", required: true

    type Payloads::TaskUpdatePayloadType

    def resolve(id:, input:)
      must_be_authenticated!

      task = Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by!(id: id)
      task.update(input.to_h)

      task.project.users.each do |user|
        TaskTreeSchema.subscriptions.trigger "taskUpdated", { id: task.id }, task, scope: user.id unless user.id === context[:user_id]
      end

      { task: task }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{id}."
    end
  end
end
