const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { ProvidePlugin } = require('webpack');
const path = require('path');

const _resolvePath = (url) => path.resolve(__dirname, url);

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  stats: 'none',
  mode: 'none',
  entry: _resolvePath('../src/main.tsx'),
  output: {
    filename: '[name].[contenthash:10].js',
    chunkFilename: 'chunk.[name].[contenthash:10].js',
    path: _resolvePath('../dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext]',
    publicPath: '/web-h5/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@/': _resolvePath('../src/'),
      '@/constants': _resolvePath('../src/constants/'),
      '@/components': _resolvePath('../src/components/'),
      '@/assets': _resolvePath('../src/assets/'),
      '@/hooks': _resolvePath('../src/hooks/'),
      '@/layouts': _resolvePath('../src/layouts/'),
      '@/locales': _resolvePath('../src/locales/'),
      '@/mobx': _resolvePath('../src/mobx/'),
      '@/theme': _resolvePath('../src/theme/'),
      '@/pages': _resolvePath('../src/pages/'),
      '@/routes': _resolvePath('../src/routes/'),
      '@/services': _resolvePath('../src/services/'),
      '@/utils': _resolvePath('../src/utils/'),
      '@/styles': _resolvePath('../src/styles/'),
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      cache: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:10].css',
      chunkFilename: isDev ? 'css/[id].css' : 'css/chunk.[id].[contenthash:10].css',
      ignoreOrder: true,
    }),
    new ProgressBarPlugin(),
    new SpeedMeasurePlugin(),
    new CopyPlugin({
      patterns: [{ from: 'public/commonModule', to: './commonModule' }],
    }),
    new ProvidePlugin({
      process: require.resolve('process/browser'),
    }),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
            ],
            exclude: [/[\\/]node_modules[\\/]/],
          },
          {
            test: /\.(tsx|ts)$/,
            use: 'ts-loader',
            exclude: [/[\\/]node_modules[\\/]/],
          },
          {
            test: /(\.module).(css|s[ac]ss)$/,
            use: [
              {
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:5]',
                  },
                },
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: require.resolve('sass'),
                },
              },
            ],
          },
          {
            test: /\.(s[ac]ss|css)$/,
            use: [
              {
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              },
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  implementation: require.resolve('sass'),
                },
              },
            ],
          },
          {
            test: /\.(png|svg|jpeg|jpg|gif)/,
            exclude: [/[\\/]node_modules[\\/]/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 8 * 1024,
              },
            },
            generator: {
              filename: 'assets/images/[hash][ext][query]',
            },
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/fonts/[hash][ext][query]',
            },
          },
          {
            test: /\.(mp3|ogg|avi|mp4|wav)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/media/[hash:10][ext][query]',
            },
          },
        ],
      },
    ],
  },
  externals: {
    i18next: 'i18next',
    mobx: 'mobx',
    axios: 'axios',
  },
};
