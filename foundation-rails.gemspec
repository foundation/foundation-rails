# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'foundation/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "foundation-rails"
  spec.version       = Foundation::Rails::VERSION
  spec.authors       = ["Yetinauts"]
  spec.email         = ["contact@get.foundation"]
  spec.description   = %q{Foundation on Sass/Compass}
  spec.summary       = %q{Foundation on Sass/Compass}
  spec.homepage      = "https://get.foundation"
  if spec.respond_to?(:metadata=)
    spec.metadata = {
      "bug_tracker_uri" => "https://github.com/foundation/foundation-rails/issues",
      "changelog_uri" => "https://github.com/foundation/foundation-rails/releases",
      "homepage_uri" => "https://get.foundation",
      "source_code_uri" => "https://github.com/foundation/foundation-rails"
    }
  end
  
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "sass", [">= 3.3.0"]
  spec.add_dependency "railties", [">= 3.1.0"]
  spec.add_dependency "sprockets-es6", [">= 0.9.0"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "capybara"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "rspec", "~> 3.2"
  spec.add_development_dependency "appraisal"

  # Required by dummy app
  spec.add_development_dependency "bootsnap"
  spec.add_development_dependency "listen"
end
