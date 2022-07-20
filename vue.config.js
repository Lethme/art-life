const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        "src/assets/styles/global-media.less",
        "src/assets/styles/global-variables.less",
      ],
    },
  },
});
