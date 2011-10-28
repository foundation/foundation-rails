require 'rails/generators'

module Foundation
  module Generators
    class LayoutGenerator < Rails::Generators::Base
      source_root File.join(File.dirname(__FILE__), 'templates')
      argument :layout_name, :type => :string, :default => 'application', :banner => 'layout_name'
      
      def create_layout
        template 'application.html.erb', "app/views/layouts/#{file_name}.html.erb"
      end
      
      def setup_viewport
        erb_viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n'
        haml_viewport = '    %meta{:name=>"viewport",:content=>"width=device-width, initial-scale=1.0"}\n'
        
        # Need to selectively add this depending on which file is present
        insert_into_file "app/views/layouts/application.html.erb", erb_viewport, :after => "<head>\n"
        insert_into_file "app/views/layouts/application.html.haml", haml_viewport, :after => "%head\n"
      end
      
      private
        def file_name
          layout_name.underscore.downcase
        end
    end
  end
end