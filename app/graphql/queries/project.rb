# frozen_string_literal: true

module Queries
  class Project < BaseQuery
    include GraphqlHelper

    description "Returns all project resources for a user."
    argument :id, String, required: true, description: "The identifier of the project"

    type Types::ProjectType, null: false

    def resolve(id:)
      must_be_authenticated!
      User.find_by(id: context[:user_id]).projects.find_by!(id: id)
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{id}."
    end
  end
end
