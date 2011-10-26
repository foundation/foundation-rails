# WELCOME TO FOUNDATION

Foundation is a rock-solid, responsive framework for rapidly prototyping and iterating into production code. It includes a 12-column, future-friendly grid and tons of great tools and elements that'll get you up and running in no time.

Homepage:      http://foundation.zurb.com  
Documentation: http://foundation.zurb.com/docs

Foundation is MIT-licensed and absolutely free to use. Foundation wouldn't be possible without the support of the entire ZURB team, our friends and colleagues who gave feedback, and some luminaries who did some heavy lifting that we took advantage of (thanks guys).

# Installation


Inside your Gemfile add the following line:

  `gem "zurb-foundation", :group => :assets`

Then run `bundle install` to install the gem.

## What now?

If you want to include Foundation on all of your application pages (and why wouldn't you!) then run the following to append `foundation` to your application sprockets files:

`rails g foundation:install`

You can also manually include `foundation` on specific pages using:

```
stylesheet_link_tag "foundation"
javascript_include_tag "foundation"
```

Or add `require "foundation"` to your sprockets files like so:

**in application.css**  
`/*= require "foundation" */`

**in application.js**  
`//= require "foundation"`

### Set the viewport

Finally you'll also want to add the following line to the `<head>` section in your layout file (i.e. `app/views/application.html.erb`) so the design will scale for mobile devices:

`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`


# Using foundation in production

Before pushing your application to production, you'll need to determine how you want your assets served.  You can either compile them on-the-fly or precompile them (recommended).  Before continuing you'll want to check your Rails application Gemfile and ensure that `gem "zurb-foundation"` is included in the `assets` group.

## To compile on-the-fly

In your Rails application edit `config/application.rb` and change:

`Bundler.require(*Rails.groups(:assets => %w(development test)))`

to:

`Bundler.require(:default, :assets, Rails.env)`

Then in `config/environments/production.rb` make sure the following setting exists:

`config.assets.compile = true`

Now all your assets will be compiled the first time someone visits your site, which can cause some delay.  Kind of like the first time Passenger spins up your application after it has been idle for some time.

## To precompile assets using Capistrano

In your Rails application edit `Capfile` and add the following line after `load 'deploy'`:

`load 'deploy/assets'`

Now when you run `cap deploy` the `deploy:assets:precompile` task will be run which takes care of running `bundle exec rake assets:precompile` for you.

By default assets that are precompiled will be located in the `public/assets/` folder of your application.

## Why use this gem?


* Easy to setup: Start using Foundation in mere seconds, like a boss
* Paths: All images will work regardless of if you deploy to a sub-uri or not
* Clean: Don't clutter up your assets directory
  
# Dependencies

* rails (~> 3.1)
* jquery-rails (~> 1.0)

# MIT Open Source License


Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.