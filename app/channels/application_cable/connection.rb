# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :user_id

    def user_id
      request.session[:user_id]
    end
  end
end
