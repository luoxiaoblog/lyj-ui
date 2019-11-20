const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin (
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
				}
      }
    )
  ]
});