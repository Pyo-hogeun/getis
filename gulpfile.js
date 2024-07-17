'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

// scss
var sass = require('gulp-sass')(require('sass'));

var departureSrc = './assets';
var destinationSrc = './assets';

gulp.task('sass', function () {
	return gulp.src(departureSrc+'/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(destinationSrc+'/css'))
		.pipe(browserSync.stream());
});


gulp.task('js', function () {
	return gulp.src(departureSrc+'/js/*.js')
		.pipe(browserSync.stream());
});

gulp.task('html', function () {
	return gulp.src('html/*.html')
		.pipe(browserSync.stream());
});

gulp.task('serve', async function () {

	browserSync.init({
		server: './',
		port: 8080
	});

	gulp.watch([departureSrc+"/scss/**/*.scss"], gulp.series('sass'));
	gulp.watch([departureSrc+"/js/*.js"], gulp.series('js'));;
	gulp.watch(["html/**/*.html"], gulp.series('html'));
});

gulp.task('default', gulp.series('sass', 'js', 'html','serve' ));