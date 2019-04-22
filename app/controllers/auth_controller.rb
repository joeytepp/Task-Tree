# frozen_string_literal: true

class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def session_create
    session[:user_id] = 1
    redirect_to '/'
  end
end
