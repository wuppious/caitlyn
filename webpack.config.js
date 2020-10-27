/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint-env node */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [path.resolve(__dirname, 'src/index')],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: HtmlWebpackTemplate,
      title: 'caitlyn',
      appMountId: 'game-root',
    }),
  ],
  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    compress: true,
    port: 9000,
    stats: {
      children: false,
      modules: false,
    },
  },
};
