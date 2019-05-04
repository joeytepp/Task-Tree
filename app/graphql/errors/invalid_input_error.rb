# frozen_string_literal: true

module Errors
  class InvalidInputError < BaseExecutionError
    def initialize(msg = "Invalid input provided!")
      @code = :INVALID_INPUT
      super msg
    end
  end
end
