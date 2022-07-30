/* eslint-disable prettier/prettier */
const { VueLoaderPlugin } = require("vue-loader");
const FileLoaderPlugin = require("file-loader");

module.exports = {
    module: {
        rules: [
            // ... другие правила
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp|jpg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
        ],
    },
    plugins: [
        // убедитесь что подключили плагин!
        new VueLoaderPlugin(),
        new FileLoaderPlugin(),
    ],
};