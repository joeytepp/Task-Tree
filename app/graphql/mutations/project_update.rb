# frozen_string_literal: true

module Mutations
  class ProjectUpdate < BaseMutation
    description 'Updates a project by identifier.'

    type Payloads::ProjectUpdatePayloadType
    argument :id, String, required: true, description: 'The identifier of the project.'
    argument :input, Inputs::ProjectUpdateInputType, required: true, description: 'The project to be updated.'

    def resolve(id:, input:)
      project = Project.update(id, input.to_h)
      { project: project }
    rescue ActiveRecord::RecordNotFound
      raise Errors::NotFoundError, "Could not find the project with identifier #{id}"
    end
  end
end
