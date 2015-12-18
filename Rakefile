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
    sh 'cp -R bower_components/foundation-sites/js/* vendor/assets/js/'
    sh 'cp -R bower_components/foundation-sites/scss/* vendor/assets/scss/'

    manifest = Dir['vendor/assets/js/*.js'].
      map { |file| "//= require js/#{File.basename(file, '.js')}" }.
      sort.join("\n")
    File.write('vendor/assets/js/foundation.js', manifest)

    puts 'Now update version.rb'
  end

  desc 'Remove old Foundation for Sites assets'
  task :clean do
    sh 'rm -rf vendor'
    sh 'mkdir -p vendor/assets/js/ vendor/assets/scss'
  end

end
