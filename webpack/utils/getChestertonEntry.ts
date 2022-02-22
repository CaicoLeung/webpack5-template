import { getAllRaptorHtml, getAllRaptorInlineHtml } from "./getChestertonsHtmlWebpackPlugins";
import webpack from "webpack";

export function getRaptorWebpackEntry(): webpack.Configuration["entry"] {
  const names = getAllRaptorHtml();
  return names.reduce((acc, name) => {
    return {
      ...acc,
      [name]: `./raptor/${name}/index.ts`,
    };
  }, {});
}
