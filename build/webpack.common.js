const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin') //引入vue-loader库
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    app: './src/index.ts'
  },
  module: {
		rules: [{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader', //ts加载器
				options: {
					transpileOnly: true,
					appendTsSuffixTo: [/.vue$/]
				} //认识vue文件
			},
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
							hmr: process.env.NODE_ENV === 'development',
							reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'tslint-loader'
			},
		]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(), //vue-loader插件加载方式
		new HtmlWebpackPlugin({ //此部分新增加
			filename: 'index.html', //需要自动注入的文件名称
			template: 'index.html', //需要自动注入的模板的文件名称
			inject: true //是否自动注入生成后的文件
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDevMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevMode ? '[id].css' : '[id].[hash].css',
		}),
  ],
  resolve: {
		extensions: ['.js', '.vue', '.json', '.ts'],
		alias: {
			'@': path.resolve('src')
		}
	},
}