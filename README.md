# Foundation::Rails

[![Gem Version](https://badge.fury.io/rb/foundation-rails.svg)](https://badge.fury.io/rb/foundation-rails)

**Foundation::Rails** is a gem that makes it super easy to use Foundation in your upcoming Rails project.

## Installation

Add these lines to your application's Gemfile:

```shell
gem 'foundation-rails'
gem 'autoprefixer-rails'
```

And then execute:

```shell
bundle
```

Or install it yourself as:

```shell
gem install foundation-rails
```

### Configuring Foundation

You can run the following command to add Foundation:

```shell
rails g foundation:install
```

Generating Haml or Slim versions of the markup can be done by appending the `--haml` or `--slim` option to the above command.

### Motion UI

[Motion UI](https://github.com/zurb/motion-ui) is a Sass library for creating flexible UI transitions and animations, and it comes packaged with the `foundation-rails` gem. To use Motion UI, uncomment the following lines from `foundation_and_overrides.scss`:

```scss
// @import 'motion-ui/motion-ui';
// @include motion-ui-transitions;
// @include motion-ui-animations;
```

## Manual Installation

### Add Foundation to your CSS

Append the following line to your `app/assets/stylesheets/application.css` file:

```scss
/*= require foundation
```

If you're planning on using Sass, then you'll want to rename `application.css` to `application.scss`. That file should then look like:

```scss
@import "foundation_and_overrides";
/* Add imports of custom sass/scss files here */
```

### Add Foundation to your JS

Append the following lines to your `app/assets/javascripts/application.js` file:

```js
//= require foundation
$(function(){ $(document).foundation(); });
```

Or if you use Turbolinks:

```js
//= require foundation
$(document).on('turbolinks:load', function() {
    $(function(){ $(document).foundation(); });
});
```

### Set Viewport Width

Add the following line to the `head` of your page layout:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## Usage

Run the generator to add foundation to the asset pipeline:

```shell
rails g foundation:install [layout_name] [options]

Options:
    [--haml]         # Generate HAML layout instead of erb
    [--slim]         # Generate Slim layout instead of erb
Runtime options:
    -f, [--force]    # Overwrite files that already exist
    -p, [--pretend]  # Run but do not make any changes
    -q, [--quiet]    # Suppress status output
    -s, [--skip]     # Skip files that already exist
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Resources

* [Foundation Docs](http://foundation.zurb.com/docs)
* [Foundation Forum](http://foundation.zurb.com/forum)
* [Foundation Training](http://zurb.com/university/courses)
