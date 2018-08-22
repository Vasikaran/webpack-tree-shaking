const path = require('path');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin')
  .default;
const webpackMajorVersion = require('webpack/package.json').version.split(
  '.'
)[0];

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist/webpack-' + webpackMajorVersion),
    publicPath: '',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  // mode: 'production',
  mode: 'development',
  plugins: [new WebpackDeepScopeAnalysisPlugin()],
  optimization: {
    usedExports: true
    // concatenateModules: true,
    // occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  require.resolve('babel-preset-env'),
                  {
                    modules: false,
                    useBuiltIns: true,
                    targets: {
                      browsers: [
                        'Chrome >= 60',
                        'Safari >= 10.1',
                        'iOS >= 10.3',
                        'Firefox >= 54',
                        'Edge >= 15'
                      ]
                    }
                  }
                ]
              ],
              plugins: [['dynamic-import-webpack']]
            }
          }
        ]
      }
    ]
  }
};
