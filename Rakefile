require 'bundler/setup'
require 'bundler/gem_tasks'
require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:rspec)

desc 'Run the test suite'
task :default => :rspec

namespace :assets do
  desc 'Update Foundation for Sites assets'
  task update: :clean do
    sh 'bower install'
    sh 'cp bower_components/modernizr/modernizr.js vendor/assets/javascripts/vendor/.'
    sh 'cp -R bower_components/foundation/js/foundation/ vendor/assets/javascripts/foundation/'
    sh 'cp -R bower_components/foundation/scss/* vendor/assets/stylesheets/'

    manifest = Dir['vendor/assets/javascripts/foundation/*.js'].
      map { |file| "//= require foundation/#{File.basename(file, '.js')}" }.
      sort.join("\n")
    File.write('vendor/assets/javascripts/foundation.js', manifest)

    puts 'Now update version.rb'
  end

  desc 'Remove old Foundation for Sites assets'
  task :clean do
    sh 'rm -rf vendor'
    sh 'mkdir -p vendor/assets/javascripts/vendor vendor/assets/stylesheets'
  end
end
