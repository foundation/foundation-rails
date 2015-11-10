require 'fileutils'

desc 'Copy the files from a Foundation 6 distribution to vendor/'
task :import6 do
  base = ENV['DIR']
  unless base && File.exist?(base)
    puts 'Could not find Foundation distribution directory'
    exit 1
  end

  FileUtils.rm_r 'vendor'
  FileUtils.mkdir_p 'vendor/assets/javascripts/foundation'
  FileUtils.mkdir_p 'vendor/assets/stylesheets'

  js_files = []
  [
    'foundation.core.js',
    'foundation.util.*.js',
    'foundation.*.js',
  ].each do |pattern|
    js_files += Dir.glob(File.join(base, 'js', pattern)).map do |path|
      File.basename path
    end
  end
  js_files.uniq!

  File.open 'vendor/assets/javascripts/foundation.js', 'wb' do |f|
    js_files.each do |file|
      f.write "//= require foundation/#{file}\n"
      FileUtils.cp File.join(base, 'js', file),
                   'vendor/assets/javascripts/foundation'
    end
  end

  FileUtils.cp_r File.join(base, 'scss'), 'vendor/assets/stylesheets/'
  FileUtils.mv 'vendor/assets/stylesheets/scss',
               'vendor/assets/stylesheets/foundation'
end
