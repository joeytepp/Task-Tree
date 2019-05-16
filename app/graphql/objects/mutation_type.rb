# frozen_string_literal: true

module Objects
  class MutationType < BaseObject
    # Project mutations
    field :project_create, resolver: Mutations::ProjectCreate
    field :project_update, resolver: Mutations::ProjectUpdate
    field :project_delete, resolver: Mutations::ProjectDelete

    # Task mutations
    field :task_create, resolver: Mutations::TaskCreate
    field :task_update, resolver: Mutations::TaskUpdate
    field :task_delete, resolver: Mutations::TaskDelete
    field :task_complete, resolver: Mutations::TaskComplete
  end
end
