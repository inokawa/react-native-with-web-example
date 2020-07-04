const path = require('path');

const common = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'web'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'],
  },
};

const dev = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'web'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
};

const prod = {
  mode: 'production',
};

module.exports = function () {
  if (process.env.NODE_ENV === 'production') {
    return {...common, ...prod};
  } else {
    return {...common, ...dev};
  }
};
