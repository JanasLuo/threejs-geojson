/*
 * @Author: janasluo
 * @Date: 2021-08-22 10:46:06
 * @LastEditTime: 2021-08-22 10:53:20
 * @LastEditors: janasluo
 * @Description: 
 * @FilePath: /digital_police/Users/janas/work/project/threejs/threejs-geojson/webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//devlopment vs Production 区分模式打包 npm install webpack-merge -D
module.exports = {
  mode: "development", //production
  entry: "./index.js",
  output: {
    //path:path.resolve("F:\ThreeJs\threejspro\build")
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
  ],
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          outputPath: 'img/'
        }
      }
    }]
  },
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8089
  }
}