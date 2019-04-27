# frozen_string_literal: true

module GraphqlHelper
  def must_be_authenticated!
    raise Errors::UnauthenticatedError unless context[:user_id]
  end

  def must_be_owner!(user)
    raise Errors::ForbiddenError, 'Must be the owner of this resource to perform this operation' unless context[:user_id] == user
  end
end
