const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './template.html'),
  }),
];

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.tsx'),
  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader?cacheDirectory=true']
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(jpg|jpeg)$/,
      type: 'asset/inline'
    },
    {
      test: /\.(json|png)$/,
      type: 'asset/resource'
    },
    ]
  },
  plugins,
  devServer: {
    hot: true,
    port: 7777,
    open: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map'
}