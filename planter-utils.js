const crypto = require('crypto');

const prod_env = (process.env.NODE_ENV === 'production');

// Utilities
function configureStyleOptions(opts) {
  if (opts.minify === false) return {};
  else return ({
    outputStyle: 'compressed',
  });
}

function configureJsOptions(opts) {
  // Default is to pass terser no options, 
  // which means it will use *its* defaults
  let options = {};
  if (opts.minify &&
    typeof opts.minify === 'object' 
    && !Array.isArray(opts.minify)) {
      options = opts.minify;
  }

  if (opts.minify === false) return false;

  return options;
}

function configureHtmlOptions(opts) {
  // Default
  let options = {
    indent_size: '2',
  };
  if (opts.beautify &&
    typeof opts.beautify === 'object' 
    && !Array.isArray(opts.beautify)) {
      options = opts.beautify;
  }

  return options;
}

function envSwitch(dev, prod, force) {
  if (prod_env || force) return prod;
  return dev;
}

function hash() {
  return crypto.randomBytes(3).toString('hex');
}

function replace(match, str) {
  return str.replace(`[${match}]`)
}

function infix(infix, str) {
  let parts = str.split('.');
  return `${parts[0]}.${infix}.${parts[1]}`
}



module.exports = {
  configure: {
    css: configureStyleOptions,
    js: configureJsOptions,
    html: configureHtmlOptions,
  },
  envSwitch: envSwitch,
  hash: hash,
  replace: replace,
  infix: infix,
}