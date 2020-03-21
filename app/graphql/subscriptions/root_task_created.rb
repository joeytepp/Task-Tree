# frozen_string_literal: true

module Subscriptions
  class RootTaskCreated < BaseSubscription
    include GraphqlHelper

    description "Subscribes to any newly created task resources"

    argument :project_id, String, "The identifier of the project.", required: true

    type Objects::TaskType

    def subscribe(project_id:)
      must_be_authenticated!
      task = Project.find_by(id: project_id).tasks.last
      task
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with id #{project_id}."
    end
  end
end
