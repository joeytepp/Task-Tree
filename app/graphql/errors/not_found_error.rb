# frozen_string_literal: true

module Errors
  class NotFoundError < BaseExecutionError
    def initialize(msg = "Unable to find resource")
      @code = :NOT_FOUND
      super msg
    end
  end
end
