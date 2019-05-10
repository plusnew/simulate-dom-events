const config = require('./webpack.base.conf.js');
const path = require('path');

config.externals = {};

config.devtool = 'inline-source-map';

config.module.rules.push({
  enforce: 'post',
  test: /\.tsx?$/,
  loader: 'istanbul-instrumenter-loader',
  include: path.resolve('src/'),
  exclude: /\.test\.tsx?$/,
});

module.exports = config;
