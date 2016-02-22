'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
//var connect = require('gulp-connect');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var lib = require('bower-files')();

// This shouldn't be a gulp task, it should be a bower post-install hook
gulp.task('bower', function() {
	gulp.src('./src/index.html')
		.pipe(wiredep({
			directory: './bower_components',
			bowerJson: require('./bower.json'),
		}))
		.pipe(gulp.dest('./dist'));
});


gulp.task('webserver', function(){
	browserSync.init({
		server: {
			baseDir: './dist/'
		}
	});

	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

gulp.task('build-css', function(){
	gulp.src(lib.ext('css').files)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('build-js', function(){
	gulp.src(lib.ext('js').files)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('styles', function() {
	gulp.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(browserSync.stream());
});

gulp.task('index', function(){
	var target = gulp.src('./dist/index.html');
	var sources = gulp.src(['./dist/**/*.css', './dist/**/*.js'], {read: false});

	return target.pipe(inject(sources))
		.pipe(gulp.dest('./dist/'));

});

gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['styles']);
	//gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('default', ['build-css', 'build-js', 'styles', 'index', 'webserver', 'watch']);

gulp.task('serve', ['bower', 'styles', 'webserver', 'watch']);