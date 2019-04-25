# frozen_string_literal: true

module GraphqlHelper
  def must_be_authenticated!
    raise Errors::UnauthenticatedError unless context[:user]
  end
end
