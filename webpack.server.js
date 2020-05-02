const webpack = require('webpack');
const path = require('path');
const nodeExternal = require('webpack-node-externals');

module.exports = {
  mode: "development",
  target: 'node',
  entry: {
    server: path.resolve('./server/app.js'),
  },
  externals: [nodeExternal()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ "process.env.PORT": process.env.PORT || 3000 })
  ],
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, './dist')
  },
};