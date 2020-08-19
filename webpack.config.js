const path = require('path')
const cssOutput = 'styles.css'
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = (env) => {
  return [{
    entry: { main: './src/index.js' },
    output: {
      publicPath: '/public/',
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
    devServer: {
      publicPath: '/public/',
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader'],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader',
          }),
        },
        // {
        //   test: /\.models$/,
        //   loader: 'webpack-models-loader'
        // }
      ],
    },
    plugins: [
      new ExtractTextPlugin(cssOutput),
    ],
  },
  ]
}
