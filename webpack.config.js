var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./src/main.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/public' }])
  ],
  resolve: {
    extensions: ['.ts']
  }
}