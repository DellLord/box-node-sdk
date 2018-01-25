const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.mode;

const libraryName = 'BoxSdk';

let plugins = [], outputFile;

outputFile = libraryName + '.min.js';
plugins.push(new UglifyJsPlugin({
  sourceMap: true,
  uglifyOptions: {
    compress: { warnings: false },
    ecma: 5
  }
}));

let config = {
  entry: __dirname + '/lib/box-node-sdk.js',
  devtool: '#source-map',
  output: {
    path: __dirname + '/client_build',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    sourceMapFilename: libraryName + '.map'
  },
  node: {
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader"
        }
      }
    ]
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['.js']
  },
  plugins: plugins
};

module.exports = config;