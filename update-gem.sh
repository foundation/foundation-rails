#! /bin/sh

bower install
rm -rf vendor/assets/javascripts/vendor
rm -rf vendor/assets/stylesheets
mkdir -p vendor/assets/javascripts/vendor
mkdir -p vendor/assets/stylesheets
cp bower_components/modernizr/modernizr.js vendor/assets/javascripts/vendor/.
cp -R bower_components/foundation/js/foundation/ vendor/assets/javascripts/foundation/
cp -R bower_components/foundation/scss/ vendor/assets/stylesheets/
cp bower_components/foundation/scss/foundation/_settings.scss vendor/assets/.

# echo "Now update version.rb"