const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    filename: 'build/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: [
          'babel-loader?cacheDirectory'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]',
        ]
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
    // new HtmlWebpackPlugin({
    //   title: '甘肃银行大屏展示系统',
    //   filename: 'index.html',
    //   template: 'src/template/index.html'
    // }),

    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     screw_ie8: true,
    //     warnings: false
    //   }
    // }),
    new webpack.HotModuleReplacementPlugin() // 启用 HMR
  ],
  resolve: {
    extensions: ['.js', '.jsx'],//后缀名自动补全
    alias: {
      vendors: path.resolve(__dirname, 'vendors'),
      styles: path.resolve(__dirname, 'src/assets/styles'),
      images: path.resolve(__dirname, 'src/assets/images'),
      config: path.resolve(__dirname, 'src/scripts/config'),
      pages: path.resolve(__dirname, 'src/scripts/pages'),
      components: path.resolve(__dirname, 'src/scripts/components'),
      utils: path.resolve(__dirname, 'src/scripts/utils'),
    }
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    port:8081,
  },
  devtool: 'source-map',
};
