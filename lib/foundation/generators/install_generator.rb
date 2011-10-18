require 'rails/generators'

module Foundation
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.join(File.dirname(__FILE__), 'templates')
      
      def add_assets
        insert_into_file "app/assets/javascripts/application.js", "//= require foundation\n", :after => "jquery_ujs\n"
        insert_into_file "app/assets/stylesheets/application.css", " *= require foundation\n", :after => "require_self\n"
      end
    end
  end
end