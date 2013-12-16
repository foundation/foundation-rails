# Foundation::Rails

[Foundation](http://foundation.zurb.com/) is the first and most advanced responsive, front-end framework in the world.

Millions of designers and engineers use Foundation in their workflows. It was the first framework to introduce the concepts of responsive design, semantics, mobile first and partials.

The __foundation-rails__ Gem integrates Foundation CSS and JavaScript libraries for Rails.

## Installation

Add this line to your application's Gemfile:

    gem 'foundation-rails'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install foundation-rails

## Usage

Add the following to your `application.css.scss` (or equivalent):

    *= require foundation
    *= require normalize

Add the following to your `application.js`:

    //= require vendor/modernizr
    //= require foundation

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
