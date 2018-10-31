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
    sh 'cp -R bower_components/foundation-sites/dist/js/* vendor/assets/js/'
    sh 'rm -f vendor/assets/js/foundation.d.ts'
    sh 'cp -R bower_components/foundation-sites/scss/* vendor/assets/scss/'
    sh 'cp -R bower_components/foundation-sites/scss/settings/_settings.scss lib/generators/foundation/templates'
    sh 'cp -R bower_components/foundation-sites/_vendor/* vendor/assets/_vendor/'
    sh 'cp -R bower_components/motion-ui/src/* vendor/assets/scss/motion-ui'

    puts ""
    puts "********************************************************************************"
    puts "**                              ASSETS UPDATED!                               **"
    puts "********************************************************************************"
    puts "                                                                                "
    puts "                 You may need to update the list of plugins you                 "
    puts "                 want to import in \"foundation.sprockets.js\"                  "
    puts "                                                                                "

  end

  desc 'Remove old Foundation for Sites assets'
  task :clean do
    sh 'rm -rf vendor'
    sh 'mkdir -p vendor/assets/js/ vendor/assets/scss vendor/assets/scss/motion-ui vendor/assets/_vendor'
  end

end
