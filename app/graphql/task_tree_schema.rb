# frozen_string_literal: true

class TaskTreeSchema < GraphQL::Schema
  mutation(Objects::MutationType)
  query(Objects::QueryType)
end
