const webpack = require("webpack");
require("dotenv").config();

console.log(process.env.NODE_ENV);

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.fallback.fs = false;
    config.plugins = [
      ...config.plugins.filter((plugin) => !plugin.definitions),
      new webpack.ProvidePlugin({
        process: "process/browser.js",
      }),
    ];

    return config;
  },
};
