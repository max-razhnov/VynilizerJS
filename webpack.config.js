const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const express = require("express");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: process.env.ASSET_PATH
  },
  module: {
    rules: [
      { test: /\.(mp3|wav|ogg|mpeg)$/i, use: ["file-loader"] },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        use: ["url-loader"]
      },
      { test: /\.(woff|ttf|eot)$/i, use: ["file-loader"] },
      {
        test: /\.(scss|sass|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    open: true,
    port: 9000,
    compress: true,
    before: function(app, server) {
      app.use("/api", express.static(path.join(__dirname, "src")));
    }
  }
};
