# frozen_string_literal: true

module Objects
  class SubscriptionType < BaseObject
    include GraphqlHelper

    field :task_updated, TaskType, null: false, description: "A task was updated.", subscription_scope: :user_id do
      argument :id, String, required: true
    end

    def task_updated(id:)
      must_be_authenticated!
      task = ::Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by(id: id)
      task
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{id}."
    end
  end
end
