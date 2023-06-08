import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DeadCodePlugin from 'webpack-deadcode-plugin';
import path from 'path';
import {
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  SourceMapDevToolPlugin,
} from 'webpack';

export default {
  mode: 'development',
  bail: true,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new EnvironmentPlugin(
      {
        API_BASE_URL: 'http://localhost:54155/api/',
        APP_BASE_URL: 'http://localhost:8000/',
      },
    ),
    new HotModuleReplacementPlugin(),
    new DeadCodePlugin({
      patterns: [
        'app/features/**/*.(js|css)',
      ],
      exclude: [
        '**/*.(spec|test).js',
        '**/index.js',
      ],
    }),
    new HtmlWebpackPlugin({template: 'app/index.ejs'}),
    new SourceMapDevToolPlugin({
      test: /main\.js/,
      filename: '[file].map',
      columns: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|babelHelpers|\.test\.js$)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'entry',
                corejs: 3,
                modules: false,
              }],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-external-helpers',
              // This is disabled because it breaks Kentico's grids for some reason
              //'react-hot-loader/babel',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                sourceMap: true,
                plugins: [autoprefixer],
              },
            },
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
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: 'asset/resource',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
