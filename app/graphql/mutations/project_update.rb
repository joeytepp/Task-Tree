# frozen_string_literal: true

module Mutations
  class ProjectUpdate < BaseMutation
    include GraphqlHelper

    description "Updates a project by identifier."

    type Payloads::ProjectUpdatePayloadType
    argument :id, String, "The identifier of the project.", required: true
    argument :input, Inputs::ProjectUpdateInputType, "The project to be updated.", required: true

    def resolve(id:, input:)
      must_be_authenticated!
      user = User.find_by(id: context[:user_id])
      project = user.projects.find_by!(id: id)
      project.update(input.to_h)
      { project: project }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{id}"
    end
  end
end
