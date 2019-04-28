# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :project, resolver: Queries::Project
    field :projects, resolver: Queries::Projects
    field :root_tasks, resolver: Queries::RootTasks
  end
end
