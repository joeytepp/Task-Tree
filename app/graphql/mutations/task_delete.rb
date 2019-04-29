# frozen_string_literal: true

module Mutations
  class TaskDelete < BaseMutation
    include GraphqlHelper

    description "Deletes a task by identifier."

    type Payloads::TaskDeletePayload

    argument :id, String, required: true, description: "The identifier of the project to delete."

    def resolve(id:)
      must_be_authenticated!

      user = User.find_by(id: context[:user_id])
      task = Task.find_by!(id: id, project: [user.projects])

      task.destroy!

      { deleted_task_id: task.id }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{id}."
    end
  end
end
