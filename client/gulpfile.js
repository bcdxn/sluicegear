var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    source      = require('vinyl-source-stream'),
    browserify  = require('browserify'),
    reactify    = require('reactify'),
    streamify   = require('gulp-streamify'),
    concat      = require('gulp-concat'),
    minifyCss   = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    watch       = require('gulp-watch'),
    rename      = require('gulp-rename');

var path = {
  HTML:           './src/index.html',
  CSS:            './src/app/**/*.css',
  JS:             './src/app/**/*.js',
  JS_ENTRY_POINT: './src/app/app.js',
  DIST:           './public/dist',
  OUT_CSS:       'bundle.css',
  OUT_JS:        'bundle.js',
  OUT_CSS_MIN:   'bundle.min.css',
  OUT_JS_MIN:    'bundle.min.js',
};

// Copy over index.html to dist
gulp.task('html', function(){
  gulp.src(path.HTML)
      .pipe(gulp.dest(path.DIST));
  console.log('----HTML UPDATED----');
});

// Concat and minify CSS
gulp.task('css', function () {
  gulp.src(path.CSS)
      .pipe(concat(path.OUT_CSS))
      .pipe(gulp.dest(path.DIST))
      .pipe(minifyCss())
      .pipe(rename(path.OUT_CSS_MIN))
      .pipe(gulp.dest(path.DIST));
  console.log('----CSS UPDATED----');
});

// Watch changes to JS
gulp.task('js', function() {
  try {
    browserify(path.JS_ENTRY_POINT)
    .transform(reactify)
    .bundle()
    .pipe(source(path.OUT_JS))
    .pipe(gulp.dest(path.DIST))
    .pipe(rename(path.OUT_JS_MIN))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DIST));
    console.log('----JS UPDATED----');
  } catch (e) {
    console.log('----JS ERROR!----');
    console.log(e);
  }
});

// Watch changes to HTML
gulp.task('watchHtml', function () {
  gulp.watch(path.HTML, ['html']);
});

// Watch changes to CSS
gulp.task('watchCss', function () {
  gulp.watch(path.CSS, ['css']);
});

// Watch changes to JS
gulp.task('watchJs', function () {
  gulp.watch(path.JS, ['js']);
});                               

// Default tasks
gulp.task('default', ['js', 'css', 'html', 'watchJs', 'watchCss', 'watchHtml']);