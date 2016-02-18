'use strict';

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var sass = require('gulp-sass');
var connect = require('gulp-connect');


// This shouldn't be a gulp task, it should be a bower post-install hook
gulp.task('bower', function() {
	gulp.src('./src/index.html')
		.pipe(wiredep({
			directory: './bower_components',
			bowerJson: require('./bower.json'),
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('webserver', function() {
	connect.server({
		livereload: true
	});
});


gulp.task('html', function() {
	gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(connect.reload());
});

gulp.task('styles', function() {
	gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(connect.reload());
});


gulp.task('watch', function() {
	gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('default', ['bower']);

gulp.task('serve', ['html', 'bower', 'styles', 'webserver', 'watch']);