const nodeExternals = require("webpack-node-externals");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const srcPath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist");

module.exports = {
  context: srcPath,
  entry: "./server/index.js",
  output: {
    path: distPath,
    filename: "server.js",
    publicPath: "/assets/"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: ["*", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader?classPrefix"
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          babelrc: true
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: `~./assets/fonts/[name].[ext]`
          }
        }
      }
    ]
  },
  plugins: [new ExtractTextPlugin("style.css")],
  externals: nodeExternals()
};
