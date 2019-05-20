# frozen_string_literal: true

module Queries
  class RootTasks < BaseQuery
    include GraphqlHelper

    description "Returns all root tasks for a project"

    type [Objects::TaskType], null: false

    argument :project_id, String, "The identifier of the project.", required: false

    def resolve(args = {})
      must_be_authenticated!

      ::Task.joins(project: :users).where(create_where_opts(args)).order(created_at: :desc)
    end

    private

      def create_where_opts(args)
        project_opts = args[:project_id] ? { project_id: args[:project_id] } : {}

        { parent_id: nil, completed: false, users: { id: context[:user_id] }, **project_opts }
      end
  end
end
