const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const year = (new Date()).getFullYear().toString();
const month = (new Date()).getMonth() + 1;
const date = (new Date()).getDate();
const timer = year + (month < 10 ? '0' + month : month).toString() + (date < 10 ? '0' + date : date).toString();
const curr = require('../utils/publish');
const publishDirName = curr.substr(0,15) + '_' + timer;


const webpackConfig = merge(base, {
    output: {
        path: path.resolve(__dirname, '../dist/cdn'),
        filename: publishDirName + '/src/js/[name]_[hash:8].js',
        chunkFilename: publishDirName + '/src/js/[id]_[hash:8].js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ],
                include: path.join(__dirname, '../src')
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    }, 
                    'postcss-loader', 
                    'stylus-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico|woff|woff2|eot|ttf|svg|swf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: path.posix.join(publishDirName + '/src', '/images/[name][hash:8].[ext]')
                        }
                    }
                ]
            }
        ]
    },

    plugins: [

        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss: [autoprefixer]
            }
        }),

        new MiniCssExtractPlugin({
            filename: publishDirName + '/src/css/[name]_[hash:8].css'
        }),

        new BundleAnalyzerPlugin()
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma:8,
                    output: {
                        comments: false, // 保留注释
                        beautify: false  // 不需要格式化
                    },
                    compress: {
                        drop_console: true, // 去除console
                        collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
                        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                    }
                }
            })
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks:{
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: true,
                    test: /[\\/]node_modules[\\/]/,
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
});


module.exports = webpackConfig;
