const path = require('path');

module.exports = {
    entry: './src/playground/redux-expensify.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node-modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        port: 8080,
        open: true,
        hot: false,
        historyApiFallback: true
    },
    devtool: 'eval-cheap-module-source-map'
}