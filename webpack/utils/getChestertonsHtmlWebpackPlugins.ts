import fs from "fs";
import path from "path";
import { Options } from "html-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const htmlFolder = path.join(process.cwd(), "raptor");

export function getAllChestertonsHtml() {
  return fs.readdirSync(htmlFolder);
}

function getChestertonsHtmlName(file: string) {
  return file.replace(/\.html$/, "");
}

function getHtmlWebpackPluginConfig(fileName: string): Options {
  return {
    template: `raptor/${fileName}/index.html`,
    filename: `${fileName}.html`,
    chunks: [`${fileName}`],
  };
}

export default function getChestertonsHtmlWebpackPlugins() {
  const allChestertonsHtml = getAllChestertonsHtml();
  const webpackPluginConfigs = allChestertonsHtml.map((file) => {
    const fileName = getChestertonsHtmlName(file);
    return getHtmlWebpackPluginConfig(fileName);
  });
  return webpackPluginConfigs.map((config) => new HtmlWebpackPlugin(config));
}
