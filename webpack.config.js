const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer');

const args = process.argv.slice(2);
const isAnalyze = args.includes('--analyze');
const ifElse = condition => (resolve, reject) => (condition ? resolve : reject);
const ifAnalyze = ifElse(isAnalyze);
const isProd = process.env.NODE_ENV === 'production';

// Ignore pattern for file mapping
const globOptions = {
  ignore: path.resolve(__dirname, './lib/components/**/_*.js'),
};

// Mapping entry points
const entryObj = glob
  .sync(path.resolve(__dirname, './lib/components/**/*.js'), globOptions)
  .reduce((obj, filePath) => {
    const entry = path.basename(filePath, '.js');

    obj[entry] = filePath; // eslint-disable-line no-param-reassign

    return obj;
  }, {});

module.exports = {
  entry: entryObj,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /\.s?[ac]ss$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(png|jpe?g)$/,
      exclude: /node_modules/,
      loader: 'url-loader',
    },
    {
      test: /\.svg$/,
      exclude: /node_modules/,
      loader: 'svg-url-loader',
    },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),

    ...ifAnalyze([new BundleAnalyzerPlugin()], []),
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
    emotion: {
      commonjs2: 'emotion',
      commonjs: 'emotion',
      umd: 'emotion',
      amd: 'emotion',
    },
    'react-emotion': {
      commonjs2: 'react-emotion',
      commonjs: 'react-emotion',
      umd: 'react-emotion',
      amd: 'react-emotion',
    },
    classnames: {
      commonjs2: 'classnames',
      commonjs: 'classnames',
      umd: 'classnames',
      amd: 'classnames',
    },
    'prop-types': {
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      umd: 'prop-types',
      amd: 'prop-types',
    },
  },
};
