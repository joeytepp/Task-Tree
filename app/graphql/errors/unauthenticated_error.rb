# frozen_string_literal: true

module Errors
  class UnauthenticatedError < BaseExecutionError
    def initialize
      super 'You must be authenticated to perform this action!'
    end

    def to_h
      super.merge(extensions: { code: 'UNAUTHENTICATED' })
    end
  end
end
