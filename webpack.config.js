const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const path = require('path')

const DEVELOPMENT = 'development'
const PRODUCTION = 'production'

module.exports = ({ mode = DEVELOPMENT }) => {
  const isDev = mode === DEVELOPMENT
  const isProd = mode === PRODUCTION

  const getStyles = () => {
    const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'
    return [styleLoader, 'css-loader', 'sass-loader']
  }

  const getFileName = (ext) => {
    return `[name]${isProd ? '[hash:8]' : ''}-build.${ext}`
  }

  return {
    mode,
    entry: `/src/main.jsx`,

    devtool: isDev ? 'source-map' : false,

    output: {
      filename: getFileName('js'),
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      clean: true,
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      hot: isDev,
      port: 3000,
      open: true,
      historyApiFallback: true,
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
          use: getStyles(),
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        minify: {
          removeComments: isProd,
          collapseWhitespace: isProd,
        },
      }),
      new MiniCssExtractPlugin({
        filename: getFileName('css'),
      }),
    ],
  }
}
