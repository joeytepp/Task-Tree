# frozen_string_literal: true

module Mutations
  class ProjectDelete < BaseMutation
    description 'Deletes a project by identifier.'
    type Payloads::ProjectDeletePayloadType
    argument :id, String, required: true, description: 'The identifier of the project to be deleted.'

    def resolve(id:)
      Project.find_by!(id: id).destroy!
      { deleted_project_id: id }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{id}"
    end
  end
end
