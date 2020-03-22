# frozen_string_literal: true

module Subscriptions
  class TaskDeleted < BaseSubscription
    include GraphqlHelper

    description "Subscribes to the deletion of a task resource"

    argument :id, String, "The identifier of the task.", required: true

    type Objects::TaskType

    def subscribe(id:)
      must_be_authenticated!
      task = ::Task.joins(project: :users).where(users: { id: context[:user_id] }).find_by(id: id)
      task
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the task with identifier #{id}."
    end
  end
end
