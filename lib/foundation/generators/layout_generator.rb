require 'rails/generators'

module Foundation
  module Generators
    class LayoutGenerator < Rails::Generators::Base
      source_root File.join(File.dirname(__FILE__), 'templates')
      argument :layout_name, :type => :string, :default => 'application', :banner => 'layout_name'
      
      def create_layout
        template 'application.html.erb', "app/views/layouts/#{file_name}.html.erb"
      end
      
      private
        def file_name
          layout_name.underscore.downcase
        end
    end
  end
end