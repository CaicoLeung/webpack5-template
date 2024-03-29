import { isDev, isProd, isRaptorProject, isVueDesignProject } from "./contants";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { getRaptorHtmlWebpackPlugins } from "./utils/getChestertonsHtmlWebpackPlugins";
import { getRaptorWebpackEntry } from "./utils/getChestertonEntry";

const baseConfig: webpack.Configuration = {
  stats: "minimal",
  context: path.resolve(process.cwd()),
  entry: {},
  output: {
    clean: true,
    path: path.join(process.cwd(), "dist"),
    filename: "[name].[hash:8].js",
    chunkFilename: "[id].[chunkhash].js",
  },
  module: {
    rules: [
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        sideEffects: true,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.txt$/i,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: "static", to: "static" }],
    }),
    new ESLintWebpackPlugin({
      context: ".",
      fix: true,
    }),
  ],
  cache: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // Enable/disable multi-process parallel running.
        terserOptions: {
          output: {
            comments: isProd,
          },
          compress: {
            drop_console: isProd,
            drop_debugger: isProd,
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
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/](react|react-dom)/,
          chunks: "all",
          priority: 2,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@example": path.join(process.cwd(), "src", "example"),
      "@images": path.join(process.cwd(), "src", "assets", "images"),
      "@common": path.join(process.cwd(), "src", "common"),
      "@": path.join(process.cwd(), "src"),
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
  Object.assign(baseConfig.entry, getRaptorWebpackEntry());
  const plugins = getRaptorHtmlWebpackPlugins();

  baseConfig.plugins?.push(...plugins);
} else if (isVueDesignProject) {
  const reactEntry = {
    vueDesign: "./vue-design-realize/observer/index.ts"
  };
  Object.assign(baseConfig.entry, reactEntry);

  const config: HtmlWebpackPlugin.Options = {
    filename: "index.html",
    chunks: ["vueDesign"],
    minify: isProd && {
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      collapseWhitespace: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    },
  };

  baseConfig.plugins?.push(new HtmlWebpackPlugin(config));
} else {
  const reactEntry = {
    index: "./src/index.tsx",
  };
  Object.assign(baseConfig.entry, reactEntry);

  const config: HtmlWebpackPlugin.Options = {
    template: "src/index.html",
    filename: "index.html",
    chunks: ["index"],
    minify: isProd && {
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      collapseWhitespace: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    },
  };

  baseConfig.plugins?.push(new HtmlWebpackPlugin(config));
}

export default baseConfig;
