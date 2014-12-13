path = require 'path'
gulp = require 'gulp'
concat = require 'gulp-concat'
stylus = require 'gulp-stylus'
reload = require 'gulp-livereload'
awatch = require 'gulp-autowatch'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'

coffeeify = require 'coffeeify'
browserify = require 'browserify'

# paths
paths =
  coffee: './client/**/*.coffee'
  html: './client/*.html'
  stylus: './client/**/*.styl'
  public: './public'
  coffeeSrc: './client/start.coffee'

gulp.task 'server', (cb) ->
  require './app'

# javascript
gulp.task 'coffee', ->
    bCache = {}
    b = browserify paths.coffeeSrc,
      debug: true
      insertGlobals: false
      cache: bCache
      extensions: ['.coffee']
    b.transform coffeeify
    b.bundle()
    .pipe source "start.js"
    .pipe buffer()
    .pipe gulp.dest paths.public
    .pipe reload()

gulp.task 'html', ->
  gulp.src paths.html
  .pipe gulp.dest paths.public

gulp.task 'stylus', ->
  gulp.src paths.stylus
  .pipe stylus()
  .pipe concat 'app.css'
  .pipe gulp.dest paths.public
  .pipe reload()

gulp.task 'watch', ->
  awatch gulp, paths

gulp.task 'default', ['coffee', 'html', 'stylus', 'server', 'watch']
