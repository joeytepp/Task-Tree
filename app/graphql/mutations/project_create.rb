# frozen_string_literal: true

module Mutations
  class ProjectCreate < BaseMutation
    include GraphqlHelper

    type Payloads::ProjectCreatePayloadType
    description 'Creates a new project resource'
    argument :input, Inputs::ProjectCreateInputType, required: true, description: 'The project to be created.'

    def resolve(input:)
      must_be_authenticated!
      user = User.find_by(id: context[:user]['id'])
      project = ::Project.new(input.to_h.merge(users: [user]))
      project.save!
      { project: project }
    end
  end
end
