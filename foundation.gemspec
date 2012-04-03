# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "foundation/version"

Gem::Specification.new do |s|
  s.name        = "zurb-foundation"
  s.version     = Foundation::VERSION
  s.authors     = ["ZURB"]
  s.email       = ["foundation@zurb.com"]
  s.homepage    = "http://foundation.zurb.com"
  s.summary     = %q{Get up and running with Foundation in seconds}
  s.description = %q{An easy to use, powerful, and flexible framework for building prototypes and production code on any kind of device.}

  s.rubyforge_project = "foundation"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  # s.add_development_dependency "rspec"
  # s.add_runtime_dependency "rest-client"
  s.add_runtime_dependency "railties", ">= 3.1.0", "< 4.0"
  s.add_runtime_dependency "jquery-rails", ">= 1.0"
end
