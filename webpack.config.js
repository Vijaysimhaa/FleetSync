const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './js/firebase/firebase-config.js',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new Dotenv()
  ],
  mode: 'development'
};