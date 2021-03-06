# frozen_string_literal: true

module Objects
  class QueryType < BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :project, resolver: Queries::Project
    field :projects, resolver: Queries::Projects
    field :task, resolver: Queries::Task
    field :tasks, resolver: Queries::Tasks
    field :root_tasks, resolver: Queries::RootTasks
  end
end
