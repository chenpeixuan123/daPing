
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    vendor:['react', 'react-dom','echarts','amcharts3','gsap','ramda','react-css-modules']
  },
  output: {
    path: path.resolve(__dirname, '../server/public/'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
      new webpack.DllPlugin({
            path: path.join(__dirname, '../server/public/manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
            name: '[name]_library',
        })
    //   new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     screw_ie8: true,
    //     warnings: false
    //   }
    // })
  ]
};