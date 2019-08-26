const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const express = require("express");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.(mp3|wav|ogg|mpeg)$/, use: ["file-loader"] },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: ["url-loader"]
      },
      { test: /\.(woff|ttf|eot)$/, use: ["file-loader"] },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new ExtractTextPlugin("dist/styles.css")
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    open: true,
    port: 9000,
    compress: true,
    before: function(app, server) {
      app.use("/api", express.static(path.join(__dirname, "src")));
    }
  }
};
