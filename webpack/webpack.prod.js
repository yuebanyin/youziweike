const { merge } = require('webpack-merge');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const os = require('os');

const coreLen = os.cpus().length;

const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
    // new PurgeCSSPlugin({}),
  ],
  optimization: {
    nodeEnv: 'production',
    minimize: true,
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    usedExports: true,
    sideEffects: true,
    minimizer: [
      new CssMinimizerWebpackPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        parallel: coreLen,
        extractComments: false,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
            drop_debugger: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minRemainingSize: 0,
      minSize: 30 * 1024,
      minChunks: 2,
      enforceSizeThreshold: 50000,
      maxAsyncRequests: 20,
      maxInitialRequests: 20,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          chunks: 'all',
          enforce: true,
          name: 'vendors',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
});
