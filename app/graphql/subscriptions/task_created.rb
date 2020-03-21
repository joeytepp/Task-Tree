# frozen_string_literal: true

module Subscriptions
  class TaskCreated < BaseSubscription
    include GraphqlHelper

    description "Subscribes to any newly created non-root task resources"

    argument :parent_id, String, "The identifier of the parent task.", required: true

    type Objects::TaskType

    def subscribe(parent_id:)
      must_be_authenticated!
      task = ::Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by(parent_id: parent_id)
      task
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{parent_id}."
    end
  end
end
