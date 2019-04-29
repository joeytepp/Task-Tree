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

      user = User.find_by(id: context[:user_id])
      task = Task.find_by(id: id, project: [user.projects])
      task.update(input.to_h)

      { task: task }
    end
  end
end
