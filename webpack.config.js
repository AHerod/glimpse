const path = require('path')
const cssOutput = 'styles.css'
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack');


module.exports = (env) => {
  return [{
    entry: {
      main: './src/index.js',
      cubes: './src/cubes_index.js',
      spheres: './src/spheres_index.js'
    },
    output: {
      publicPath: '/public/',
      path: path.resolve(__dirname, 'public'),
      filename: '[name]_bundle.js',
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
            fallback: ['style-loader', 'css-loader'],
          }),
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
              },
            }

          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin(cssOutput),
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
        jquery: "jquery"
      })
    ],
    resolve: {
      alias: {
        "TweenLite": path.resolve('node_modules', './gsap/src/uncompressed/TweenLite.js'),
        "TweenMax": path.resolve('node_modules', './gsap/src/uncompressed/TweenMax.js'),
        "TimelineLite": path.resolve('node_modules', '/gsap/src/uncompressed/TimelineLite.js'),
        "TimelineMax": path.resolve('node_modules', './gsap/src/uncompressed/TimelineMax.js'),
        "ScrollMagic": path.resolve('node_modules', './scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        "animation.gsap": path.resolve('node_modules', './scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        "debug.addIndicators": path.resolve('node_modules', './scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
      }
    },
  },
  ]
}

