# frozen_string_literal: true

module Errors
  class ForbiddenError < BaseExecutionError
    def initialize(msg = "You are forbidden from performing this action")
      @code = :ACTION_FORBIDDEN
      super msg
    end
  end
end
