# frozen_string_literal: true

class TaskTreeSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
