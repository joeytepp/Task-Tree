# frozen_string_literal: true

module Mutations
  class TaskUpdate < BaseMutation
    include GraphqlHelper

    description "Updates a task by identifier."

    argument :id, String, required: true, description: "The identifier of the project."
    argument :input, Inputs::TaskUpdateInputType, required: true, description: "The task to be updated."

    type Payloads::TaskUpdatePayloadType

    def resolve(id:, input:)
      must_be_authenticated!

      task = Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by(id: id)
      task.update(input.to_h)

      task.project.users.each do |user|
        TaskTreeSchema.subscriptions.trigger "taskUpdated", { id: task.id }, task, scope: user.id unless user.id === context[:user_id]
      end

      { task: task }
    end
  end
end
