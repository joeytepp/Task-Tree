# frozen_string_literal: true

module Errors
  class UnauthenticatedError < BaseExecutionError
    def initialize
      @code = :UNAUTHENTICATED
      super 'You must be authenticated to perform this action!'
    end
  end
end
