const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')

const PRODUCTION = 'production'
const DEVELOPMENT = 'development'
const SRC_DIR = path.resolve(__dirname, 'src')

module.exports = ({ mode = DEVELOPMENT }) => {
  return {
    mode: 'development',
    entry: `/src/main.jsx`,
    devtool: 'source-map',

    output: {
      filename: '[name][fullhash:8]-build.js',
      path: path.resolve(__dirname, './dist'),
      clean: true,
    },
    resolve: {
      modules: ['../node_modules'],
      extensions: ['.js', '.jsx'],
      //modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name]-[hash:7][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
        {
          test: /\.s?[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'public/index.html' }),
      new MiniCssExtractPlugin({
        filename: 'main-[hash:8].css',
      }),
    ],
  }
}
