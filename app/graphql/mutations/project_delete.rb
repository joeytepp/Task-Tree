# frozen_string_literal: true

module Mutations
  class ProjectDelete < BaseMutation
    include GraphqlHelper

    description "Deletes a project by identifier."
    type Payloads::ProjectDeletePayloadType
    argument :id, String, "The identifier of the project to be deleted.", required: true

    def resolve(id:)
      must_be_authenticated!
      user = User.find_by!(id: context[:user_id])
      project = user.projects.find_by!(id: id)
      project.destroy!
      { deleted_project_id: project.id }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{id}."
    end
  end
end
