# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def current_user
      byebug
      User.where(email: "joey.tepperman@queensu.ca") || reject_unauthorized_connection
    end
  end
end
