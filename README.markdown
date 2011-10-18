WELCOME TO FOUNDATION
=====================

Foundation is a rock-solid, responsive framework for rapidly prototyping and iterating into production code. It includes a 12-column, future-friendly grid and tons of great tools and elements that'll get you up and running in no time.

Homepage:      http://foundation.zurb.com  
Documentation: http://foundation.zurb.com/docs

Foundation is MIT-licensed and absolutely free to use. Foundation wouldn't be possible without the support of the entire ZURB team, our friends and colleagues who gave feedback, and some luminaries who did some heavy lifting that we took advantage of (thanks guys).

Installation
============

Inside your Gemfile add the following line:

  `gem "zurb-foundation"`

Then run `bundle install` to install the gem.

What now?
---------

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

Why use this gem?
-----------------

* Easy to setup: Start using Foundation in mere seconds, like a boss
* Paths: All images will work regardless of if you deploy to a sub-uri or not
* Clean: Don't clutter up your assets directory
  
Dependencies
============
* rails (~> 3.1)
* jquery-rails (~> 1.0)

MIT Open Source License
=======================

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.