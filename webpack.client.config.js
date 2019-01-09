const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const AssetsPlugin = require("assets-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const srcPath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist");

const environmentFiles = {
  development: "./.env.development",
  webTesting: "./.env.webTesting",
  production: "./.env.production",
  custom: "./.env.custom"
};

const plugins = [
  new webpack.LoaderOptionsPlugin({
    debug:
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "custom" ||
      process.env.NODE_ENV === "webTesting"
  }),
  new HTMLWebpackPlugin({
    template: path.resolve(__dirname, "src/client/index.ejs")
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: Infinity
  }),
  new Dotenv({
    path:
      environmentFiles[process.env.NODE_ENV] || environmentFiles["development"],
    safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    silent: false // hide any errors
  }),
  new CopyWebpackPlugin([
    { from: "assets/ext", to: `${distPath}/assets/ext/` },
    { from: `${srcPath}/sitemap.xml`, to: `${distPath}/sitemap.xml` }
  ]),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|es/)
];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  );
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  plugins.push(new AssetsPlugin());
}

if (process.env.NODE_ENV === "analyse") {
  plugins.push(new BundleAnalyzerPlugin());
}

const config = {
  devtool: "inline-source-map",
  context: srcPath,
  target: "web",
  entry: {
    client: `${srcPath}/client/index.js`,
    vendor: [
      "react",
      "react-dom",
      "react-router-dom",
      "redux",
      "redux-thunk",
      "react-redux"
    ]
  },
  output: {
    path: distPath,
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
    host: "localhost", //host: "0.0.0.0",
    open: true,
    openPage: "",
    disableHostCheck: true
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
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          babelrc: true
        }
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true //This is important!
            }
          }
        ]
      },
      // Tell the DEFAULT sass-rule to ignore being used for sass imports in less files
      {
        test: /\.scss$/,
        issuer: {
          exclude: /\.less$/
        },
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      // Define a second rule for only being used from less files
      // This rule will only be used for converting our sass-variables to less-variables
      {
        test: /\.scss$/,
        issuer: /\.less$/,
        use: {
          loader: `${srcPath}/styles/sassVarsToLess.js` // Change path if necessary
        }
      },
      {
        test: /(\.css$)/,
        loaders: ["style-loader", "css-loader"]
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
  plugins
};

if (process.env.NODE_ENV === "production") {
  config.devtool = "";
}

module.exports = config;
