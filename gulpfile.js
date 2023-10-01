const gulp = require("gulp");

const merge = require('merge-stream');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const html_validator = require('gulp-html');

const src = './src';
const dist = './dist';

function clean_dist() {
  return gulp.src(dist + '/*', {read: false}).pipe(clean());
}

function validate() {
  return gulp.src(src + '/**/*.html').pipe(html_validator({verbose: true}));
}

function copy_src() {
  // place code for your default task here
  return gulp.src(src + '/**').pipe(gulp.dest('dist/'));
}

function copy_reveal() {
  reveal = gulp.src('node_modules/reveal.js/dist/**').pipe(gulp.dest('dist/reveal/'));
  plugin = gulp.src('node_modules/reveal.js/plugin/**').pipe(gulp.dest('dist/plugin/'));
  copycode = gulp.src('node_modules/reveal.js-copycode/plugin/copycode/**').pipe(gulp.dest('dist/plugin/copycode'));
  return merge(reveal, plugin, copycode)
}

function watch_src() {
  //gulp.watch(src, copy_src().pipe(connect.reload()));
  gulp.watch(src, copy_src);
}

function watch_dist() {
  gulp.watch(dist + '/**').on('change', (filepath) => gulp.src(filepath, {read : false}).pipe(connect.reload()));
}

function serve() {
  connect.server({
    root: dist,
    port: 8000,
    host: 'localhost',
    livereload: true
  })
}

exports.clean = clean_dist;
exports.watch = gulp.series(watch_src);
exports.serve = gulp.parallel(serve, watch_src, watch_dist);
exports.default = gulp.series(copy_reveal, validate, copy_src)
