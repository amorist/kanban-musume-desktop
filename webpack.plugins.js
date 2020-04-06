const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const assets = ["models"];

const isDevelopment = process.env.NODE_ENV !== "production";

const CopyPlugins = assets.map((asset) => {
  return new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, "src", asset),
      to: isDevelopment
        ? path.resolve(__dirname, ".webpack/renderer", asset)
        : path.resolve(__dirname, ".webpack/renderer/main_window", asset),
    },
  ]);
});

module.exports = [new ForkTsCheckerWebpackPlugin(), ...CopyPlugins];
