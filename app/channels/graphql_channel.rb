# frozen_string_literal: true

class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    @subscription_ids = []
  end

  def execute(data)
    query = data["query"]
    variables = data["variables"]
    operation_name = data["operationName"]
    byebug
    context = {
      current_user: current_user,
      current_user_id: current_user.id,
      channel: self
    }

    result = ::TaskTreeSchema.execute(
      query: query,
      context: context,
      variables: variables,
      operation_name: operation_name,
    )

    payload = {
      result: result.subscription? ? nil : result.to_h,
      more: result.subscription?,
    }

    if result.context[:subscription_id]
      @subscription_ids << context[:subscription_id]
    end

    transmit payload
  end

  def unsubscribed
    @subscription_ids.each do |id|
      RailsRelaySchema.subscriptions.delete_subscription id
    end
  end
end
