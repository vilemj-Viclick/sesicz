const path = require('path');
const config = require('./my.config');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    config,
    // In order to compile React in production mode
    'process.env': {
      'NODE_ENV': JSON.stringify(config.productionBuild ? 'production' : 'development'),
    },
  }),
  new CaseSensitivePathsPlugin(),
  new CircularDependencyPlugin(),
  new ExtractTextPlugin({
    filename: '[name].css'
  }),
];
if (config.productionBuild) {
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require'],
    },
    compress: {
      warnings: false,
    },
  }));
}

module.exports = {
  entry: {
    client: './client/app/main.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public/build'),
    publicPath: '/',
    pathinfo: !config.productionBuild,
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.less',
    ]
  },
  devtool: config.productionBuild ? '' : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        include: [
          path.resolve(__dirname, 'client'),
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.less?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader'],
        }),
        include: [
          path.resolve(__dirname, 'client'),
        ],
      },
    ],
  },
  plugins,
};
