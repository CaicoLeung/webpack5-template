import webpackMerge from "webpack-merge";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import baseConfig from "./webpack.base";
import { isRaptorProject } from "./contants";
import { getAllChestertonsHtml } from "./utils/getChestertonsHtmlWebpackPlugins";
import HTMLInlineCSSWebpackPlugin from "html-inline-css-webpack-plugin";
import PurgecssPlugin from "purgecss-webpack-plugin";

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
      chunkFilename: "[id].[contenthash].css",
    }),
  ],
};

if (isRaptorProject) {
  config.plugins?.push(
    // 将css内联至dom里
    new HTMLInlineCSSWebpackPlugin({
      styleTagFactory: ({ style }: any) => {
        return `<style type="text/css">${style}</style>`;
      },
    }),
    // 剔除没有使用到的css样式
    new PurgecssPlugin({
      paths: getAllChestertonsHtml().map((name) => `raptor/${name}/index.html`),
    }),
  );
}

export default webpackMerge(baseConfig, config);
