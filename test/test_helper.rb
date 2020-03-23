# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Execute a gql query
  def exec_query(*args, **kwargs)
    TaskTreeSchema.execute(*args, **kwargs)
  end

  # Make sure authentication works
  def assert_auth_works(*args, **kwargs)
    res = exec_query(*args, **kwargs)
    errors = res.to_h["errors"]

    assert_same 1, errors.length

    error = errors[0]
    expected_extensions = { code: :UNAUTHENTICATED }

    assert_equal "You must be authenticated to perform this action!", error["message"]
    assert_equal expected_extensions, error[:extensions]
  end
end
