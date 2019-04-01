# frozen_string_literal: true

# See https://github.com/shakacode/react_on_rails/blob/master/docs/basics/configuration.md
# for many more options.
module RenderingExtension
  # Return a Hash that contains custom values from the view context that will get passed to
  # all calls to react_component and redux_store for rendering
  def self.custom_context(view_context)
    if view_context.controller.is_a?(ActionMailer::Base)
      {}
    else
      {
        somethingUseful: view_context.session[:something_useful]
      }
    end
  end
end


ReactOnRails.configure do |config|
  config.random_dom_id = false # default is true
  config.node_modules_location = "client" # Pre 9.0.0 always used "client"
  config.build_production_command = "yarn run build:production"
  config.build_test_command = "yarn run build:test"

  # See webpacker.yml public_output_path for replacement for generated_assets_dir
  # config.generated_assets_dir = File.join(%w[public webpack], Rails.env)
  config.webpack_generated_files = %w[manifest.json]
  config.server_bundle_js_file = "server-bundle.js"
  config.rendering_extension = RenderingExtension
end
