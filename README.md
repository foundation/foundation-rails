# Foundation::Rails

TODO: Write a gem description

## Installation

Add this line to your application's Gemfile:

    gem 'foundation-rails'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install foundation-rails

## Usage

Run the generator to add foundation to the asset pipeline:

    $ rails g foundation:install [layout_name] [options]

    Options:
      [--haml]  # Generate HAML layout instead of erb
      [--slim]  # Generate Slim layout instead of erb

    Runtime options:
      -f, [--force]    # Overwrite files that already exist
      -p, [--pretend]  # Run but do not make any changes
      -q, [--quiet]    # Suppress status output
      -s, [--skip]     # Skip files that already exist

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
