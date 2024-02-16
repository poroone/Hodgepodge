const path = require("path")
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/main.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/' // 静态资源公共路径
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // 使用mini-css-extract-plugin提取CSS到单独的文件
                        options: {
                            publicPath: '' // 提取CSS的公共路径
                        }
                    },
                    'css-loader',// 使用css-loader加载CSS文件内容
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/, // SCSS或SASS文件后缀为.scss或.sass
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // 提取CSS
                        options: {
                            publicPath: ''
                        }
                    },
                    'css-loader', // 加载CSS
                    'postcss-loader',
                    'less-loader' // 加载SCSS或SASS

                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // 图片文件后缀
                type: 'asset/resource', // 使用asset模块加载图片
                generator: {
                    filename: 'assets/images/[name].[hash][ext]' // 图片输出路径
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i, // 字体文件后缀
                type: 'asset/resource', // 使用asset模块加载字体
                generator: {
                    filename: 'assets/fonts/[name].[hash][ext]' // 字体输出路径
                }
            }

        ]
    },
    plugins: [
        new VueLoaderPlugin(), // VueLoader插件
        new HtmlWebpackPlugin({ // HtmlWebpackPlugin插件
            title:"webpack",
            template: './public/index.html', // HTML模板文件路径
            inject: true // 注入所有的静态资源
        }),
        new MiniCssExtractPlugin({ // MiniCssExtractPlugin插件
            filename: '[name].[contenthash].css' // 提取的CSS文件名称
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            // vue$: 'vue/dist/vue.runtime.esm.js' // 引入运行时版本的Vue库
        },
        extensions: [".js", ".css", ".vue", ".less"]
    },
    optimization: {
        minimize: true, //mode是production执行默认压缩
        minimizer: [
            new TerserPlugin({
                parallel: true,//多进程并发运行
            }),
            new cssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'all',
        }
    },
    devServer: {
        // contentBase: path.join(__dirname, 'public'),
        compress: true, //gzip压缩
        hot: true,
        port: 8080,
       
    }
}