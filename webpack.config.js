var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: inProduction  ? 'abtester.min.js' : 'abtester.js',
        libraryTarget: 'var',
        library: 'ABTester'
    },
    module: {
        rules: [   
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),
    ],
    optimization: {
        minimizer: []
    }
};

if (inProduction) {
    module.exports.optimization.minimizer.push(
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true
            },
            sourceMap: true
        })
    )
}