const path = require("path");
const { injectBabelPlugin } = require("react-app-rewired");
const { override, addWebpackAlias } = require("customize-cra");

const mode = process.env.NODE_ENV === "development" ? "dev" : "prod";

module.exports = function override(config, env) {
  config = injectBabelPlugin(["styled-jsx/babel"], config);

  return override(
    addWebpackAlias({
      "@env": path.resolve(__dirname, "src/env", mode),
      "~": path.resolve(__dirname, "src/"),
    })
  )(config, env);
};

module.exports = override(
  addWebpackAlias({
    "@env": path.resolve(__dirname, "src/env", mode),
    "~": path.resolve(__dirname, "src/"),
  })
);
