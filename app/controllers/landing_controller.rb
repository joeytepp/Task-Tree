class LandingController < ApplicationController
  layout "landing"

  def index
    @landing_props = { authenticated: false }
  end
end
