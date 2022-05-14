var webpack = require('webpack');
var path = require('path');

var src_path = path.resolve('./src');
var dist_path = path.resolve('./dist');

module.exports = {
    context: src_path,
    entry: [
        'babel-polyfill', './index.js',
    ],
    output: {
        path: dist_path,
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: {
                    include: /node_modules/,
                    exclude: [
                        /node_modules\/chalk\/source\/index.js/,
                        /node_modules\/ws\/lib\/stream.js/,
                        /node_modules\/ws\/lib\/websocket-server.js/,
                        /node_modules\/ws\/lib\/websocket.js/,
                        /node_modules\/ws\/lib\/permessage-deflate.js/,
                    ],
                },
                loader: 'babel-loader',
                query: {
                    presets: ['react'],
                    plugins: ['transform-es2015-destructuring', 'transform-es2015-parameters', 'transform-object-rest-spread', 'transform-es2015-modules-commonjs', 'react-hot-loader/babel']
                }
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.png$/,
                loader: 'url-loader?limit=100000'
            }, {
                test: /\.jpg$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.swf$/,
                loader: "file-loader?name=[path][name].[ext]"
            }, {
                test: require.resolve('snapsvg'),
                loader: 'imports-loader?this=>window,fix=>module.exports=0'
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
        new webpack.HotModuleReplacementPlugin(),
    ],

    watch: true,
    watchOptions: {
        // 最初の変更からここで設定した期間に行われた変更は1度の変更の中で処理が行われる
        aggregateTimeout: 200,
        // ポーリングの間隔
        poll: 1000
    },

    devServer: {
        contentBase: dist_path,
        hot: true,
        port: 8888,
        host: '0.0.0.0' // originally 0.0.0.0
    },
    devtool: 'source-map'
};
