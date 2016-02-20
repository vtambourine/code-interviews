var update = require('react/lib/update');

var config = {
    output: {
        path: './build/'
    },

    cache: true,
    debug: true,
    devtool: '#inline-source-map',

    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};

var appConfig = update(config, {
    entry: {$set: './src/app.js'},
    output: {
        filename: {$set: 'app.js'}
    }
});

var serverConfig = update(config, {
    entry: {$set: './src/server.js'},
    output: {
        filename: {$set: 'server.js'},
        libraryTarget: {$set: 'commonjs2'}
    },
    externals: {$set: /^[a-z\-0-9]+$/},
    target: {$set: 'node'},
    node: {
        $set: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false
        }
    },
    module: {
        loaders: {
            $apply: function(loaders) {
                return loaders.map(function(loader) {
                    return update(loader, {
                        loader: {
                            $apply: function(loader) {
                                return loader.replace('style-loader!', '');
                            }
                        }
                    });
                });
            }
        }
    }
});

module.exports = [appConfig, serverConfig];
