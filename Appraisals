SUPPORTED_RAILS_VERSIONS = %w[
  6.0
  6.1
  7.0
].freeze

SUPPORTED_RAILS_VERSIONS.each do |rails_version|
  appraise "rails_#{rails_version}" do
    gem 'rails', "~> #{rails_version}"
  end
end
