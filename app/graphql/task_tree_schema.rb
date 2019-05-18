# frozen_string_literal: true

class TaskTreeSchema < GraphQL::Schema
  subscription(Objects::SubscriptionType)
  mutation(Objects::MutationType)
  query(Objects::QueryType)
end
