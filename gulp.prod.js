const config = require('./planter-config');
const utils = require('./planter-utils');
const gulp = require('gulp');
const { series, parallel } = require('gulp');
const merge = require('merge-stream')
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const del = require('del');
const sass = require('gulp-sass');
sass.compiler = require('sass');
const handlebars = require('gulp-hb');
const browserify = require('browserify');
const babelify = require('babelify');
const sourcemaps = require('gulp-sourcemaps');
const beautify = require('gulp-beautify');
const terser = require('gulp-terser');

let HASH = utils.hash();

// Configure global data (passed to handlebars)
const DATA = (hash) => {
  return {
    site: {
      ...config.site,
    },
    // Paths to be used in your hbs files
    assets: {
      // CSS and JS are built full prod paths to the output files
      css: `${config.prod.root}/${utils.infix(hash, config.styles.output)}`,
      js: `${config.prod.root}/${utils.infix(hash, config.js.output)}`,
      // This is just the static directory
      // Usage: "{{@root.assets.static}}/image.png"
      static: `${config.prod.root}/images`,
      shared: `${config.prod.shared}` ,
    }
  }
}

// Configure prod options based on `planter-config.js`
const options = {
  styles: utils.configure.css(config.styles.options),
  js: utils.configure.js(config.js.options),
  html: utils.configure.html(config.html.options),
}

// Compile CSS using sass
function styles() {
  return gulp.src(config.styles.entry)
    .pipe(sourcemaps.init())
    .pipe(sass(options.styles).on('error', sass.logError))
    .pipe(rename(
      utils.infix(HASH, config.styles.output)
    ))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${config.prod.dir}/${config.prod.css}`));
}

// Compile JS using browserify & babel
function js() {
  return browserify({
      entries: config.js.entry, 
      debug: true
    })
    .transform(babelify, { presets: ['@babel/preset-env'], sourceMaps: true })
    .bundle()
    .pipe(source(
      utils.infix(HASH, config.js.output)
    ))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif(options.js, terser(options.js)))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${config.prod.dir}/${config.prod.js}`));
}

// Compile HTML using handlebars
function html() {
  let filename = '';
  return gulp.src(config.html.entry)
    .pipe(handlebars()
      .data(DATA(HASH))
      .data({production: true})
      .data(config.html.match.data)
      .partials(config.html.match.templates)
      .partials(config.html.match.partials, !config.html.match.templates)
      .helpers(require('handlebars-layouts'))
      .helpers(config.html.match.helpers)
    )
    .pipe(rename((path) => {
      path.extname = '.html';
    }))
    .pipe(gulpif(options.html, beautify.html(options.html)))
    .pipe(gulp.dest(config.prod.dir));
}

function refresh(cb) {
  clean(config.prod.dir, 'js');
  clean(config.prod.dir, 'css');
  HASH = utils.hash();
  cb();
}

function static() {
  // Copy ./static and its contents to the prod path
  return gulp.src(['./static/*', '!./static/favicon.*', '!./static/shared'])
    .pipe(gulp.dest(`${config.prod.dir}/${config.prod.static}`));
}

function clean(path, ext) {
  if (path && ext) {
    return del(`${path}/**/*.${ext}`);
  }
  return del(`${config.prod.dir}/*`);
}

const log = {
  'prod:start': (cb) => { console.log('\t       ├──── Starting `prod`...'); cb(); },
  'prod:end': (cb) => { console.log('\t       ├──── Done `prod`.'); cb(); }
}

exports.prod = series(
  log['prod:start'],
  refresh, styles, js, html, static,
  log['prod:end'],
);

// exports.prod = series(
//   (cb)=>{ console.log('Starting `prod` tasks...'); cb(); },
//   refresh, styles, js, html, static,
//   (cb)=>{ console.log('`prod` done.'); cb(); },
// );