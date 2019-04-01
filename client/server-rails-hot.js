const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { resolve } = require('path');
const webpackConfig = require('./webpack.client.rails.hot.config');

const webpackConfigLoader = require('react-on-rails/webpackConfigLoader');

const configPath = resolve('..', 'config');
const { output, settings } = webpackConfigLoader(configPath);

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  publicPath: output.publicPath,
  proxy: {
    '*': output.publicPathWithHost,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  disableHostCheck: true,
  clientLogLevel: 'info',
  hot: true,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
});

devServer.listen(settings.dev_server.port, settings.dev_server.host, err => {
  if (err) console.error(err);
  console.log(`=> 🔥  Webpack development server is running on ${output.publicPathWithHost}`);
});