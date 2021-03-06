const Dotenv = require('dotenv-webpack');
const { webpack } = require('webpack');
const path = require('path');

module.exports = {
  // target: 'web',
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  // devServer: {
  //   port: 8080,
  //   hot: true,
  // },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // { test: /\.(mov|mp4)$/, loader: 'url-loader' },
      {
        test: /\.(jpe?g|png)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'svg-url-loader',
      //       options: {
      //         limit: 10000,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
      {
        test: /\.(svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //     },
      //     {
      //       loader: 'react-svg-loader',
      //       options: {
      //         jsx: true,
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [new Dotenv()],
};

//donezo
