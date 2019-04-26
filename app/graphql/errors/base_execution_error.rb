# frozen_string_literal: true

module Errors
  class BaseExecutionError < GraphQL::ExecutionError
    def to_h
      super.merge(extensions: { code: @code })
    end
  end
end
