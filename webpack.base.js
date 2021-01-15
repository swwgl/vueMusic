// webpack的配置文件
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".css", ".vue", ".styl"],
    alias: {
      "@common": "../../common",
    },
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(css|styl|stylus)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp|eot|svg|ttf|woff|woff2|mp3|mp4|wma)$/,
        use: "url-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:6].css",
    }),
    new VueLoaderPlugin(),
  ],
};
