# frozen_string_literal: true

class AuthController < ApplicationController
  include AuthHelper

  skip_before_action :verify_authenticity_token

  layout "application"

  def login
    if session[:user_id]
      redirect_to "/"
    else
      @page_title = "Log In"
      @login_props = {
        errors: flash[:errors] || {}
      }

      render action: "login"
    end
  end

  def logout
    reset_session
    redirect_to "/login"
  end

  def sign_up
    if session[:user_id]
      redirect_to "/"
    else
      @page_title = "Sign Up"
      @sign_up_props = {
        errors: flash[:errors] || {}
      }

      render action: "sign_up"
    end
  end

  def session_create
    email = params[:email]
    password = params[:password]

    begin
      user = User.find_by!(email: email)
      auth_success = user.authenticate(password)

      if auth_success
        session[:user_id] = user.id
        redirect_to "/"
      else
        handle_invalid_credentials
      end
    rescue ActiveRecord::RecordNotFound
      handle_invalid_credentials
    end
  end

  def account_create
    new_user = create_new_user_from_params

    if new_user.valid?
      begin
        new_user.save!
        session[:user_id] = new_user.id
        return redirect_to "/"
      rescue ActiveRecord::RecordNotUnique
        handle_email_not_unique
      else
        handle_sign_up_exception
      end
    else
      handle_validation_errors_for_sign_up(new_user.errors.details)
    end
  end
end
