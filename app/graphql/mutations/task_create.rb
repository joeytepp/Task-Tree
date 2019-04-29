# frozen_string_literal: true

module Mutations
  class TaskCreate < BaseMutation
    include GraphqlHelper

    description "Creates a new task."

    type Payloads::TaskCreatePayload

    argument :input, Inputs::TaskCreateInputType, required: true, description: "The task to be created."

    def resolve(input:)
      must_be_authenticated!
      user = User.find_by(id: context[:user_id])
      task = user.projects.find_by!(id: input[:project_id]).tasks.new(input.to_h)
      task.save!

      { task: task }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{input[:project_id]}"
    end
  end
end
