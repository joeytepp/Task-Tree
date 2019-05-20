# frozen_string_literal: true

module Queries
  class Project < BaseQuery
    include GraphqlHelper

    description "Returns all project resources for a user."
    argument :id, String, "The identifier of the project", required: true

    type Objects::ProjectType, null: false

    def resolve(id:)
      must_be_authenticated!
      ::Project.joins(:users).where(users: { id: context[:user_id] }).find_by!(id: id)
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{id}."
    end
  end
end
