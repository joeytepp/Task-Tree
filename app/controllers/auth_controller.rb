# frozen_string_literal: true

class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token
  layout 'application'

  def login
    if session[:user_id]
      redirect_to '/'
    else
      @page_title = 'Log In'
      render action: 'login'
    end
  end

  def sign_up
    if false
      redirect_to '/'
    else
      @page_title = 'Sign Up'
      render action: 'sign_up'
    end
  end

  def session_create
    session[:user_id] = 1
    redirect_to '/'
  end

  def account_create
    
  end
end
