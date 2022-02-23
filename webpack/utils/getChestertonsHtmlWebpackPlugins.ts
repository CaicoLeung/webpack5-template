import fs from "fs";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { isProd } from "../contants";

const raptorFolder = path.join(process.cwd(), "raptor");

export function getAllRaptorHtml() {
  return fs.readdirSync(raptorFolder);
}

function getChestertonsHtmlName(file: string) {
  return file.replace(/\.html$/, "");
}

function getHtmlWebpackPluginConfig(
  fileName: string,
  folder = "raptor",
): HtmlWebpackPlugin.Options {
  return {
    template: `${folder}/${fileName}/index.html`,
    filename: `${fileName}.html`,
    chunks: [`${fileName}`],
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
}

function getHtmlWebpackPlugins(files: string[], folder: string) {
  const webpackPluginConfigs = files.map((file) => {
    const fileName = getChestertonsHtmlName(file);
    return getHtmlWebpackPluginConfig(fileName, folder);
  });
  return webpackPluginConfigs.map((config) => new HtmlWebpackPlugin(config));
}

export function getRaptorHtmlWebpackPlugins() {
  const files = getAllRaptorHtml();
  return getHtmlWebpackPlugins(files, "raptor");
}
