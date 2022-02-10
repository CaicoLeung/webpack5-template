import { isDev, isProd, isRaptorProject } from "./contants";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import PurgecssPlugin from "purgecss-webpack-plugin";
import getChestertonsHtmlWebpackPlugins, {
  getAllChestertonsHtml,
} from "./utils/getChestertonsHtmlWebpackPlugins";
import getChestertonEntry from "./utils/getChestertonEntry";

const baseConfig: webpack.Configuration = {
  stats: "minimal",
  context: path.resolve(process.cwd()),
  entry: {
    home: "./src/index.tsx",
    dubai: "./raptor/dubai/index.ts",
  },
  output: {
    clean: true,
    path: path.join(process.cwd(), "dist"),
    filename: "[name].[hash:8].js",
    chunkFilename: "[id].[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: ["/node_modules/"],
        use: {
          loader: `babel-loader?cacheDirectory=${isDev}`,
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        sideEffects: true,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.txt$/i,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      chunks: ["home"],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "static", to: "static" }],
    }),
    new ESLintWebpackPlugin({
      context: ".",
      fix: true,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // Enable/disable multi-process parallel running.
        terserOptions: {
          compress: {
            drop_console: isProd,
          },
        },
      }),
    ],
    moduleIds: "deterministic",
    runtimeChunk: "single",
    usedExports: true,
    sideEffects: false,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        default: false,
        /* styles: {
          name: 'styles',
          test: /\.(s?css|less|sass)$/,
          chunks: 'all',
          enforce: true,
          priority: 10,
        }, */
        common: {
          name: "chunk-common",
          chunks: "all",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          enforce: true,
          reuseExistingChunk: true,
        },
        /*vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 2,
          enforce: true,
          reuseExistingChunk: true,
        },*/
      },
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve("src"),
    },
    modules: [path.resolve("src"), path.resolve("raptor"), "node_modules"],
  },
};

if (process.env.ANALYZER) {
  baseConfig.plugins?.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
    }),
  );
}

if (isRaptorProject) {
  Object.assign(baseConfig.entry, getChestertonEntry());
  const plugins = getChestertonsHtmlWebpackPlugins();

  baseConfig.plugins?.push(
    ...plugins,
    new PurgecssPlugin({
      paths: getAllChestertonsHtml().map((name) => `raptor/${name}/index.html`),
    }),
  );
}

export default baseConfig;
