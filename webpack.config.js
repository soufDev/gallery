const path = require('path')
const UrglifyJSPlugin  = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const dev = process.env.NODE_ENV === "dev"

let cssLoaders = [
    { loader: 'css-loader', options: { importLoaders: 1 } },
]

if(!dev) {
    cssLoaders.push({
            loader: "postcss-loader",
            options: {
                plugins: (loader) => {
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie > 8']
                    })
                }
            }
        })
}

let pathsToClean = [
    'assets'
]

// the clean options to use
let cleanOptions = {
    root:     path.resolve('./public/'),
    verbose:  true,
    dry:      false
}

let config = {
    entry: {
        app: ['./assets/css/app.scss', './assets/js/app.js']
    },
    watch: dev,
    output: {
        path: path.resolve('./public/assets'),
        filename: dev? '[name].js' : '[name].[chunkhash:16].js',
        publicPath: '/assets/',
    },
    devtool: dev ? "cheap-module-eval-source-map": false,
    devServer: {
        contentBase: path.resolve('./public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [...cssLoaders]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [...cssLoaders, 'sass-loader'],

                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "file-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "[name].[hash:7].[ext]"
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: dev ? '[name].css' : '[name].[chunkhash:16].css',
            disable: dev
        })
    ]
}

if(!dev) {
    config.plugins.push(new UrglifyJSPlugin({
        sourceMap: false
    }))
    config.plugins.push(new ManifestPlugin())
    config.plugins.push(new CleanWebpackPlugin(pathsToClean, cleanOptions))
}

module.exports = config