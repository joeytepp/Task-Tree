# frozen_string_literal: true

module Objects
  class SubscriptionType < BaseObject
    include GraphqlHelper

    field :task_updated, subscription: Subscriptions::TaskUpdated, subscription_scope: :user_id
    field :root_task_created, subscription: Subscriptions::RootTaskCreated, subscription_scope: :user_id
  end
end
