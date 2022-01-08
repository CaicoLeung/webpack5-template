import webpackMerge from 'webpack-merge';
import webpack from "webpack";
import { isDev, isProd } from './contants';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import baseConfig from "./webpack.base";

const config: webpack.Configuration = {
  devtool: "hidden-source-map",
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[id].[contenthash].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    })
  ]
}

export default webpackMerge(baseConfig, config);
