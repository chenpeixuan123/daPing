const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

var assetsOutput = path.resolve(__dirname, '../server/public');

module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    filename: '[hash].js',
    path: assetsOutput,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        loader:ExtractTextPlugin.extract({
          fallback:"style-loader", 
          use: "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=[name].[ext]&publicPath=/&outputPath=assets/images/'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEVTOOLS__': false,
      'process.env': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('[hash].css'),
    new AssetsPlugin({
      path: assetsOutput,
      filename: 'assets-client.json'
    }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require('../server/public/manifest.json') // 指定manifest.json
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],//后缀名自动补全
    alias: {
      vendors: path.resolve(__dirname, '../vendors'),
      images: path.resolve(__dirname, '../src/assets/images'),
      config: path.resolve(__dirname, '../src/scripts/config'),
      pages: path.resolve(__dirname, '../src/scripts/pages'),
      components: path.resolve(__dirname, '../src/scripts/components'),
      utils: path.resolve(__dirname, '../src/scripts/utils')
    }
  },
  externals: {
    // 'react': 'React',
    // 'react-router': 'ReactRouter',
    // 'react-dom': 'ReactDOM'
  }
};