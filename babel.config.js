module.exports = {
  presets: [
    ['@babel/preset-typescript', { allowNamespaces: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '60',
          firefox: '60',
          ie: '9',
          safari: '10',
          edge: 17,
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
  ],
};
