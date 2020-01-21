
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, '../server/public'),
    filename: 'bundle.js',
    publicPath: '/static/'  
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用 HMR
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, '..'),
      manifest: require('../server/public/manifest.json') // 指定manifest.json
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
 
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
  }
};