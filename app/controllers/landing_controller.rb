class LandingController < ApplicationController
  layout "landing"

  def index
    @landing_props = { authenticated: false }
    @component_name = session[:user_id] ? "Home" : "Landing"
  end
end
