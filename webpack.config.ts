import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true
    })
]

if (!isProduction) {
  plugins.push(new webpack.NamedModulesPlugin())
}

const config: webpack.Configuration = {
  entry: {
    main: './src/app/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins,
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          babelrc: true,
          plugins: ['react-hot-loader/babel'],
        }
      }, {
        loader: 'awesome-typescript-loader',
      }],
    }, {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader',
    }, {
      test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
      use: [{
        loader: 'file-loader?name=[path][name].[ext]?[hash]',
      }],
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
      }],
    }]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    port: 5000,
    stats: 'errors-only',
  }
}

export default config
