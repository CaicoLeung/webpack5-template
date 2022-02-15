import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpackMerge from "webpack-merge";
import baseConfig from "./webpack.base";

const config: webpack.Configuration = {
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

export default webpackMerge(baseConfig, config);
