
module.exports = {
  site: {
    title: 'Planter',
    lang: 'en',
  },
  build: {
    // dev, prod
    dir: './build',
    js: '',
    css: '',
    static: 'static',
    shared: 'static/shared'
  },
  prod: {
    root: 'some/project/path',
    dir: './dist',
    js: 'assets',
    css: 'assets',
    static: `images`,
    shared: 'common',
  },
  styles: {
    entry: './src/styles/style.scss',
    match: './src/styles/**/*.scss',
    output: 'style.css',
    options: {
      minify: true,
    }
  },
  js: {
    entry: './src/js/main.js',
    match: './src/js/**/*.js',
    output: 'bundle.js',
    options: {
      minify: true,
    }
  },
  html: {
    entry: './src/views/*.{hbs,html}',
    match : {
      pages: './src/views/*.{hbs,html}',
      templates: './src/views/partials/templates/**/*.hbs',
      partials: './src/views/partials/**/*.hbs',
      helpers: './src/views/helpers/**/*.js',
      data: './src/data/**/*.{js,json}',
    },
    options: {
      beautify: true,
    }
  },
  static: {
    match: './static/*',
  }
}