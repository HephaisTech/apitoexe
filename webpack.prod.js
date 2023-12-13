const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    target: 'node',
    mode: 'production',
    output: {
        path: path.join(__dirname, 'prod'),
        publicPath: '/',
        filename: '[name].bundle.js', // Include [name] placeholder
        clean: true
    },
    externals: [nodeExternals()],
    entry: {
        main: './server.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    optimization: {
        // minimize: true,
        // splitChunks: {
        //     chunks: 'all',
        //     name: 'vendor'
        // }
    }
};
