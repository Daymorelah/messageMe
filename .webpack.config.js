
import path from 'path';
import webpack from 'webpack';

//entry point for webpack i.e the react's codebase 
const APP_DIR = path.resolve(__dirname, 'server/client/app');
//path to bundle file output
const BUILD_DIR = path.relative(__dirname, 'server/client')

export default {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    loaders: [{
//check for .js and .jsx files
      test: /\.jsx?/,
      exclude: /node_modules/,
//path to be used to look for .js and .jsx file extension
      include: APP_DIR,
      loader: 'babel'
    }]
  }
}