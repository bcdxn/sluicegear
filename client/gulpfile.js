var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    watchify    = require('watchify'),
    reactify    = require('reactify'),
    streamify   = require('gulp-streamify'),
    concat      = require('gulp-concat'),
    minifyCss   = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch');

var path = {
  HTML:         './src/index.html',
  CSS:          './src/app/**/*.css',
  MINIFIED_OUT: 'build.min.js',
  OUT:          'build.js',
  DEST:         './public/dist',
  DEST_BUILD:   './public/dist/build',
  DEST_SRC:     './public/dist/src',
  ENTRY_POINT:  './src/app/app.js'
};

// Copy over index.html to dist
gulp.task('copy', function(){
  gulp.src(path.HTML)
      .pipe(gulp.dest(path.DEST));
});

// Concat and minify CSS
gulp.task('css', function () {
  console.log('CSS updated');
  gulp.src(path.CSS)
      .pipe(concat('style.css'))
      .pipe(gulp.dest(path.DEST_SRC))
      .pipe(minifyCss())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest(path.DEST_SRC));
});

// Watch changes to CSS
gulp.task('watchCss', function () {
  gulp.watch(path.CSS, ['css']);
});

// Dev task
gulp.task('watchJs', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher = watchify(browserify({
      entries:      [path.ENTRY_POINT],
      transform:    [reactify],
      debug:        true,
      cache:        {},
      packageCache: {},
      fullPaths:    true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
           .pipe(source(path.OUT))
           .pipe(gulp.dest(path.DEST_SRC));
    console.log('Updated');
  }).bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

// Production Build
gulp.task('build', function(){
  browserify({
    entries:   [path.ENTRY_POINT],
    transform: [reactify]
  }).bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

// Switch out source mappings in index.html with browserified versiion
gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// Default to Dev watch task
gulp.task('default', ['watchJs', 'watchCss']);

// Production Task
gulp.task('production', ['replaceHTML', 'build', 'css']);