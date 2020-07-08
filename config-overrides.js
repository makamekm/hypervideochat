const path = require("path");
const { override, addWebpackAlias, getBabelLoader } = require("customize-cra");

const prependBabelPlugin = (plugin) => (config) => {
  getBabelLoader(config).options.plugins.unshift(plugin);
  return config;
};
console.log(path, __dirname);

module.exports = override(
  prependBabelPlugin("styled-jsx/babel"),
  addWebpackAlias({
    "@env": path.resolve(__dirname, "src/env", process.env.ENV),
    "~": path.resolve(__dirname, "src/"),
  })
);
