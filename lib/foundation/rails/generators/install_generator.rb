require 'rails/generators'

module Foundation
  # module Rails
    module Generators
      class InstallGenerator < ::Rails::Generators::Base
        source_root File.join(File.dirname(__FILE__), '..', 'templates')
        argument :layout_name, :type => :string, :default => 'application', :banner => 'layout_name'

        class_option :haml, :desc => 'Generate HAML layout instead of erb', :type => :boolean
        class_option :slim, :desc => 'Generate Slim layout instead of erb', :type => :boolean
        class_option :skip_layout, :desc => 'Skip generating the layout', :type => :boolean, default: false

        def add_assets
          # rails_ujs breaks, need to incorporate rails-behavior plugin for this to work seamlessly
          # gsub_file "app/assets/javascripts/application#{detect_js_format[0]}", /\/\/= require jquery\n/, ""
          insert_into_file "app/assets/javascripts/application#{detect_js_format[0]}", "#{detect_js_format[1]} require foundation\n", :after => "jquery_ujs\n"
          append_to_file "app/assets/javascripts/application#{detect_js_format[0]}", "#{detect_js_format[2]}"
          settings_file = File.join(File.dirname(__FILE__),"..", "..", "..", "..", "vendor", "assets", "stylesheets", "foundation", "_settings.scss")
          create_file "app/assets/stylesheets/foundation_and_overrides.scss", File.read(settings_file)
          append_to_file "app/assets/stylesheets/foundation_and_overrides.scss", "\n@import 'foundation';\n"
          insert_into_file "app/assets/stylesheets/application#{detect_css_format[0]}", "\n#{detect_css_format[1]} require foundation_and_overrides\n", :after => "require_self"
        end

        def detect_js_format
          return ['.coffee', '#=', "\n() ->\n  $(document).foundation()\n"] if File.exist?('app/assets/javascripts/application.coffee')
          return ['.coffee.erb', '#=', "\n() ->\n  $(document).foundation()\n"] if File.exist?('app/assets/javascripts/application.coffee.erb')
          return ['.js.coffee', '#=', "\n() ->\n  $(document).foundation()\n"] if File.exist?('app/assets/javascripts/application.js.coffee')
          return ['.js.coffee.erb', '#=', "\n() ->\n  $(document).foundation()\n"] if File.exist?('app/assets/javascripts/application.js.coffee.erb')
          return ['.js', '//=', "\n$(function(){ $(document).foundation(); });\n"] if File.exist?('app/assets/javascripts/application.js')
          return ['.js.erb', '//=', "\n$(function(){ $(document).foundation(); });\n"] if File.exist?('app/assets/javascripts/application.js.erb')
        end

        def detect_css_format
          return ['.css', ' *='] if File.exist?('app/assets/stylesheets/application.css')
          return ['.css.sass', ' //='] if File.exist?('app/assets/stylesheets/application.css.sass')
          return ['.sass', ' //='] if File.exist?('app/assets/stylesheets/application.sass')
          return ['.css.scss', ' //='] if File.exist?('app/assets/stylesheets/application.css.scss')
          return ['.scss', ' //='] if File.exist?('app/assets/stylesheets/application.scss')
        end

        def create_layout
          if !options.skip_layout?
            if options.haml?||(defined?(Haml) && options.haml?)
              template 'application.html.haml', "app/views/layouts/#{file_name}.html.haml"
            elsif options.slim?||(defined?(Slim) && options.slim?)
              template 'application.html.slim', "app/views/layouts/#{file_name}.html.slim"
            else
              template 'application.html.erb', "app/views/layouts/#{file_name}.html.erb"
            end
          end
        end

        private

        def file_name
          layout_name.underscore.downcase
        end
      end
    end
  # end
end
