module.exports = {
    entry: './src/page/index.js',
    output: {
        path: 'build',
        filename: 'index.js'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
