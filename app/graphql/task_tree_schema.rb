# frozen_string_literal: true

class TaskTreeSchema < GraphQL::Schema
  use GraphQL::Subscriptions::ActionCableSubscriptions

  subscription(Objects::SubscriptionType)
  mutation(Objects::MutationType)
  query(Objects::QueryType)
end
