require "fileutils"
require "pathname"

# Specify path to checked out Foundation repo
FOUNDATION_REPO_PATH = Pathname.new("/Users/mark/Projects/foundation")

# Specify which files need to be concatenated and in what order
FOUNDATION_CSS = %w(globals.css typography.css grid.css ui.css forms.css orbit.css reveal.css mobile.css ie.css)
FOUNDATION_JS = %w(modernizr.foundation.js jquery.reveal.js jquery.orbit-1.4.0.js jquery.customforms.js jquery.placeholder.min.js jquery.tooltips.js app.js)

# Clean out vendor/assets
ASSET_PATH = Pathname.new(File.dirname(__FILE__)).join("vendor", "assets")
FileUtils.remove_dir ASSET_PATH, :force => true

# Recreate vendor/assets
FileUtils.mkdir_p ASSET_PATH.join("stylesheets", "foundation")
FileUtils.mkdir_p ASSET_PATH.join("javascripts", "foundation")
FileUtils.mkdir_p ASSET_PATH.join("images", "foundation")

# Create SCSS file, so we can usage image-url() helper
File.open(ASSET_PATH.join("stylesheets", "foundation", "index.css"), "w") do |file|
  file << "/*\n"
  FOUNDATION_CSS.each do |filename|
    unless %w(ie.css).include?(filename.downcase)
      file << "*= require 'foundation/#{filename.gsub('.css','')}'\n"
    end
    css_file = File.open(FOUNDATION_REPO_PATH.join("stylesheets", filename))
    File.open(ASSET_PATH.join("stylesheets", "foundation", "#{filename}.scss"), "w") do |include_file|
      include_file << css_file.read.gsub(/url\('?\.\.\/images\/([^\)']+)'?\)/, 'image-url("foundation/\1")')
      include_file << "\n\n"
    end
  end
  file << "*/"
end

# Create JS file
File.open(ASSET_PATH.join("javascripts", "foundation", "index.js"), "w") do |file|
  FOUNDATION_JS.each do |filename|    
    file << "//= require 'foundation/#{File.basename(filename.gsub('.js',''))}'\n"
    js_file = File.open(FOUNDATION_REPO_PATH.join("javascripts", filename))
    File.open(ASSET_PATH.join("javascripts", "foundation", filename), "w") do |include_file|
      include_file << js_file.read
      include_file << "\n\n"
    end
  end
end

# Copy Images
FileUtils.cp_r FOUNDATION_REPO_PATH.join("images/."), ASSET_PATH.join("images", "foundation")
