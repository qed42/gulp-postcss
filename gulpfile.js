var path = require('path'),
  gulp = require('gulp'),
  using = require('gulp-using'),
  babel = require('gulp-babel'),
  postcss = require('gulp-postcss'),
  postcssExtendRule = require('postcss-extend-rule'),
  sourcemaps = require('gulp-sourcemaps'),
  postcssCustomProperties = require('postcss-custom-properties'),
  nested = require('postcss-nested'),
  partials = require("postcss-partial-import"),
  cssImport = require('postcss-import'),
  postcssCustomMedia = require('postcss-custom-media'),
  pixelstorem = require('postcss-pixels-to-rem'),
  autoprefixer = require('autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  plumber = require('gulp-plumber'),
  gulpStylelint = require('gulp-stylelint'),
  gulpEslint = require('gulp-eslint'),
  eslintIfFixed = require('gulp-eslint-if-fixed'),
  prettier = require('gulp-prettier'),
  debug = require('gulp-debug'), // Debug Vinyl file streams to see what files are run through your Gulp pipeline
  imagemin = require('gulp-imagemin'),
  rtl = require('postcss-rtl');

// Variables for folder path.
var paths = {
  styles: {
    source: 'src/css/',
    destination: 'dist/css/'
  },
  scripts: {
    source: 'src/js/',
    destination: 'dist/js/'
  },
  images: 'images/'
};

// Lint CSS files.
gulp.task('lint:css', function () {
  return gulp.src(paths.styles.source + '**/*.css')
    .pipe(plumber())
    .pipe(gulpStylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }))
    .pipe(plumber.stop());
});

// Lint CSS files and throw an error for a CI to catch.
gulp.task('lint:css-with-fail', function () {
  return gulp.src(paths.styles.source + '**/*.css')
    .pipe(plugins.gulpStylelint({
      reporters: [{
        formatter: 'string',
        console: true,
        failAfterError: true
      }]
    }));
});

// Fix CSS linting errors.
gulp.task('lint:css-fix', function () {
  return gulp.src(paths.styles.source + '**/*.css')
    .pipe(gulpStylelint({
      fix: true
    }))
    .pipe(gulp.dest(paths.styles.source));
});

// Build CSS files.
gulp.task('build:css', function () {
  var plugins = [
    partials({
      prefix: '_',
      extension: '.css'
    }),
    postcssCustomMedia(),
    cssImport(),
    postcssExtendRule(),
    postcssCustomProperties({
      preserve: false
    }),
    nested(),
    autoprefixer({
      overrideBrowserslist: ['last 2 version']
    }),
    pixelstorem(),
    rtl()
  ];
  return gulp.src(paths.styles.source + 'styles.css')
    .pipe(sourcemaps.init())
    .pipe(using({prefix: 'Styles update 👉'}))
    .pipe(postcss(plugins))
    .on('error', function(errorInfo) { // if the error event is triggered, do something
      console.log(errorInfo.toString()); // show the error information
      this.emit('end'); // tell the gulp that the task is ended gracefully and resume
    })
    .pipe(cleanCSS({
      compatibility: 'ie8',
      format: 'beautify'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.destination))
});

// Watch CSS.
gulp.task('watch:css', function () {
  gulp.watch(paths.styles.source, gulp.series('build:css'));
});

// Image optimization.
gulp.task('images', function () {
  return gulp.src(paths.images + '**/*.{JPG,jpg,png,gif,svg}')
    .pipe(debug({ title: 'Optimized 👉' }))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images));
});

// Lint JavaScript.
gulp.task('lint:js', function () {
  return gulp.src(paths.scripts.source + '**/*.js')
    .pipe(plumber())
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(plumber.stop());
});

// Lint JavaScript and throw an error for a CI to catch.
gulp.task('lint:js-with-fail', function () {
  return gulp.src(paths.scripts.source + '**/*.js')
    .pipe(plumber())
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failOnError());
});

// Auto fix javaScript linting errors.
gulp.task('lint:js-fix', function () {
  return gulp.src(paths.scripts.source + '**/*.js')
    .pipe(gulpEslint({ fix: true }))
    .pipe(gulpEslint.format())
    .pipe(eslintIfFixed(paths.scripts.source));
});

// Format javaScript.
gulp.task('js-prettier', function () {
  return gulp.src(paths.scripts.source + '**/*.js')
    .pipe(plumber())
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest(paths.scripts.source));
});

// Combine - Fix javaScript errors & Format file.
gulp.task('js-fix-prettier', gulp.parallel('lint:js-fix', 'js-prettier'));

// Build Script files.
gulp.task('build:js', function () {
  return gulp.src(paths.scripts.source + '**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.destination));
});
