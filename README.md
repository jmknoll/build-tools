my basic build process for a simple front-end project

bower for package management
wiredep to keep everything nice in your index.html
gulp for process running
sass for styling
livereload for awesomeness


getting started
1. clone this repo
2. npm install && bower install
3. 


notes

wiredep
https://www.npmjs.com/package/wiredep

Include comments in index.html for wiredep to add dependencies. Like so:

<html>
<head>
  <!-- bower:css -->
  <!-- endbower -->
</head>
<body>
  <!-- bower:js -->
  <!-- endbower -->
</body>
</html>

gulp
http://gulpjs.com/

general idea - gulp compiles all scripts and css into dist folder, then runs watch function, which
recompiles everything on change


TODO:

add dev task and build task
concatentate and minify vendor js and css for build
move wiredep to bower post-install hook
add custom css and js to index.html
get rid of connect/livereload and use browsersync instead