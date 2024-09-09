const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //This property defines where the application starts
  entry:'./index.js',
    
  //This property defines the file path and the file name which will be used for deploying the bundled file
  output:{
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    assetModuleFilename: '[name][ext]' 
  },
    
  //Setup loaders
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        type: 'asset/resource'
      }
    ]
  },
    
  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}