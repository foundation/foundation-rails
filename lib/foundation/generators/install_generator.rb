require 'rails/generators'

module Foundation
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.join(File.dirname(__FILE__), 'templates')
      
      def replace_assets
        copy_file 'application.js', "app/assets/javascripts/application.js"
        copy_file 'application.css', "app/assets/stylesheets/application.css"
      end
    end
  end
end