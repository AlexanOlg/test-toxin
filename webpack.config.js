// Utils
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


// Get Pages
const pagesDir = path.resolve(__dirname, 'src/pages');
const pages = fs.readdirSync(pagesDir);

module.exports = (_, options) => {
  const isDev = options.mode === 'development';
  return {
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        scss: path.resolve(__dirname, 'src/scss/'),
        fonts: path.resolve(__dirname, 'src/fonts/'),
      },
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ],
    },
    entry: {
      index: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },       
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: isDev,
            root: path.resolve(__dirname, 'src'),
          },
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
						},
						{
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)$/,
          include: [
            path.resolve(__dirname, 'src/fonts'),
            path.resolve(__dirname, 'node_modules'),
          ],
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif)$/,
          exclude: [path.resolve(__dirname, 'src/fonts')],
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
							outputPath: 'assets/images',
            },
          },
        },
      ],
    },
    plugins: [
      ...pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: `${pagesDir}/${page}/${page}.pug`,
          }),
      ),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8585,
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  };
};