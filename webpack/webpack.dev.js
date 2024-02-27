const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.common.js');
const os = require('os');

const coreLen = os.cpus().length;

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src'),
      cache: true,
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslintcache'),
      threads: coreLen,
    }),
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    maxAge: 3600,
  },
  optimization: {
    nodeEnv: 'development',
  },
  devServer: {
    compress: true,
    port: 3001,
    open: true,
    hot: true,
    liveReload: false,
    static: false,
    historyApiFallback: {
      index: '/web-h5/',
    },
    allowedHosts: 'all',
    client: {
      logging: 'info',
      progress: true,
    },
    proxy: {
      '/Api': {
        target: 'https://yz-frontapi.szdy1688.cn',
        // target: 'http://192.168.3.140:43334',
        changeOrigin: true,
        // pathRewrite: { '^/api/': '/v1/' },
      },
    },
  },
});
