var path = require('path');
var webpack = require('webpack');
var config = {
    entry: {
        app: './src/chrome/index.js',
    },
    output: {
        filename: 'app.js',
        path: path.resolve('./bin/chrome')
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.less$/,
            loader: 'style!css!less'
        }]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};

module.exports = config;

