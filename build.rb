require "fileutils"
require "pathname"

# Specify path to checked out Foundation repo
FOUNDATION_REPO_PATH = Pathname.new("/Users/mark/Projects/foundation")

# Specify which files need to be concatenated and in what order
FOUNDATION_CSS = %w(globals.css typography.css grid.css ui.css forms.css orbit.css reveal.css mobile.css)
FOUNDATION_JS = %w(jquery.reveal.js jquery.orbit-1.3.0.js forms.jquery.js jquery.customforms.js jquery.placeholder.min.js app.js)

# Clean out vendor/assets
ASSET_PATH = Pathname.new(File.dirname(__FILE__)).join("vendor", "assets")
FileUtils.remove_dir ASSET_PATH, :force => true

# Recreate vendor/assets
FileUtils.mkdir_p ASSET_PATH.join("stylesheets")
FileUtils.mkdir_p ASSET_PATH.join("javascripts")
FileUtils.mkdir_p ASSET_PATH.join("images", "foundation")

# Create SCSS file, so we can usage image-url() helper
File.open(ASSET_PATH.join("stylesheets", "foundation.scss"), "w") do |file|
  FOUNDATION_CSS.each do |filename|
    css_file = File.open(FOUNDATION_REPO_PATH.join("stylesheets", filename))
    file << css_file.read.gsub(/url\('?\.\.\/images\/([^\)']+)'?\)/, 'image-url("foundation/\1")')
    file << "\n\n"
  end
end

# Create JS file
File.open(ASSET_PATH.join("javascripts", "foundation.js"), "w") do |file|
  FOUNDATION_JS.each do |filename|    
    js_file = File.open(FOUNDATION_REPO_PATH.join("javascripts", filename))
    file << js_file.read
    file << "\n\n"
  end
end

# Copy Images
FileUtils.cp_r FOUNDATION_REPO_PATH.join("images/."), ASSET_PATH.join("images", "foundation")