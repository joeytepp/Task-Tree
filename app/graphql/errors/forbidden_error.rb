module Errors
  class ForbiddenError < BaseError
    def initialize(msg='You are forbidden from performing this action')
      super msg
    end
  end
end