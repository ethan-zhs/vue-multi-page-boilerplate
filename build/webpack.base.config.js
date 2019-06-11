const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const curr = require('../utils/publish');

const isDev = process.env.NODE_ENV == 'development';
const isProd = process.env.NODE_ENV == 'production';
const isTest = process.env.NODE_ENV == 'test';

const entries = getEntry(['./src/containers/*/*.js']);
const pages = getEntry(['./src/containers/**/*.html']);

const webpackConfig = {
    devtool: isProd
        ? 'source-map'
        : 'cheap-module-eval-source-map',

    entry: entries,

    mode: isProd ? 'production' : 'development',

    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',                
                enforce: 'pre',
                include: path.join(__dirname, '..', 'src'),
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,                
                use: [{
                    loader: 'vue-loader',
                    options: {
                        cssModules: {
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            camelCase: true
                        },
                        extractCSS: false,
                        preserveWhitespace: false,
                        postcss: [
                            require('autoprefixer')({
                                browsers: [
                                    "> 1%",
                                    "last 5 versions",
                                    "not ie <= 8",
                                    "Android >= 4",
                                    "UCAndroid >= 9",
                                    "iOS >= 8"
                                ]
                            })
                        ]
                    }
                }]                
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: [
                    path.join(__dirname, '../src'),
                ]
            }
        ]
    },

    performance: {
        maxEntrypointSize: 300000,
        hints: isDev ? false : 'warning'
    },

    resolve: {
        alias: {
            'vue': 'vue/dist/vue',
            'Statics': path.resolve(__dirname, '../src/statics'),
            'Components': path.resolve(__dirname, '../src/components'),
            'Utils': path.resolve(__dirname, '../src/utils/utils'),
            'Global': path.resolve(__dirname, '../src/global')
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDev ? JSON.stringify('development') : JSON.stringify('production')
        }),

        new VueLoaderPlugin()
    ],

    externals: {
        'AMap': 'AMap'
    }
}

// 选择入口文件
function getEntry(globPath) {
    var entries = {}, basename, tmp, pathname;

    globPath.forEach((itemPath) => {
        glob.sync(itemPath).forEach(function (entry) {
            basename = path.basename(entry, path.extname(entry));
            if (entry.split('/').length > 4) {
                tmp = entry.split('/').splice(-3);
                pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
                entries[pathname] = entry;
            } else {
                entries[basename] = entry;
            }
        });
    });

    for (let item in entries) {
        if (item != 'containers/' + curr) {
            delete entries[item];
        }
        else {
            if (isDev && globPath[0] == './src/containers/*/*.js') {
                entries[item] = ['webpack-hot-middleware/client?reload=true', entries[item]]
            }
        }
    }
    return entries;
}


//循环输出html模板
for (let pathname in pages) {
    if (curr == pathname.split('/')[1]) {
        if (isProd || isTest) {
            const publishPath = ['../dist/project/'];

            publishPath.map(item => {
                // 配置生成的html文件，定义路径等
                const conf = {
                    filename: path.resolve(__dirname, item + pathname.split('/')[1] + '.html'),
                    template: pages[pathname],   // 模板路径
                    inject: true,  // js插入位置
                    chunksSortMode: 'dependency'
                };

                if (pathname in webpackConfig.entry) {
                    conf.chunks = ['manifest', 'vendor', pathname];
                    conf.hash = true;
                }

                webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
            });
        }
        else {
            // 配置生成的html文件，定义路径等
            const conf = {
                filename: pathname.split('/')[1] + '.html',
                template: pages[pathname],   // 模板路径
                inject: true,  // js插入位置
                chunksSortMode: 'dependency'
            };

            if (pathname in webpackConfig.entry) {
                conf.chunks = ['manifest', 'vendor', pathname];
                conf.hash = true;
            }

            webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
        }
    }
}

module.exports = webpackConfig;
