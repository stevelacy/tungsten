'use strict';


var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var reload = require('gulp-livereload');
var awatch = require('gulp-autowatch');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

var paths = {
  js: './client/**/*.js',
  html: './client/*.html',
  stylus: './client/**/*.styl',
  public: './public',
  jsSrc: './client/start.js'
};

gulp.task('server', function(cb) {
  require('./app');
});

gulp.task('js', function() {
  var b, bCache;
  bCache = {};
  b = browserify(paths.jsSrc, {
    debug: true,
    insertGlobals: false,
    cache: bCache
  });

  b.bundle()
    .pipe(source('start.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths['public']))
    .pipe(reload());
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(gulp.dest(paths['public']));
});

gulp.task('stylus', function() {
  gulp.src(paths.stylus)
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths['public']))
    .pipe(reload());
});

gulp.task('watch', function() {
  awatch(gulp, paths);
});

gulp.task('default', ['js', 'html', 'stylus', 'server', 'watch']);
