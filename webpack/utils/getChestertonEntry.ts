import { getAllChestertonsHtml } from "./getChestertonsHtmlWebpackPlugins";
import webpack from "webpack";

export default function getChestertonEntry(): webpack.Configuration["entry"] {
  const names = getAllChestertonsHtml();
  return names.reduce((acc, name) => {
    return {
      ...acc,
      [name]: `./raptor/${name}/index.ts`,
    };
  }, {});
}
