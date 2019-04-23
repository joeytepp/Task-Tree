# frozen_string_literal: true

class LandingController < ApplicationController
  layout 'application'

  def index
    if session[:user]
      @page_title = 'Home'
      @component_name = 'Home'
    else
      @page_title = 'Organize Tasks'
      @component_name = 'Landing'
    end
  end
end
