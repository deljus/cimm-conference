const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    thesis: './dynamic/Thesis/index.js',
    profileForm: './dynamic/ProfileForm/index.js',
    auth: './dynamic/Auth/index.js',
    page: './dynamic/StaticPages/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: 'css-loader'
          }
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: '[name].css' })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/public/javascripts',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: true
          }
        }
      })
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor_app',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
};
