var webpack=require("webpack");
var path=require('path');
//压缩代码
var uglifyJsPlugin=webpack.optimize.UglifyJsPlugin;

//html-webpack-plugin
var HtmlwebpackPlugin=require("html-webpack-plugin");
//OpenBrowserPlugin
var OpenBrowserPlugin=require("open-browser-webpack-plugin");

var CommonsChunkPlugin=require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports={
	entry:{
		bundle:"./client/main.jsx",
		bundle2:"./client/comment.jsx"
	},//设置入口文件
	output:{
		path:"./client/dist",
		publicPath:"/dist/",
		filename:"scripts/[name].js"//设置输出的文件
	},
	//插件
	plugins:[
		new webpack.ProvidePlugin({
			$:"jquery"
		}),
		new uglifyJsPlugin({
			compress:{
				warnings:false
			}
		}),
		new CommonsChunkPlugin("scripts/init.js")
		// new HtmlwebpackPlugin({
		// 	title:"Webpack-demos"
		// }),
		// new OpenBrowserPlugin({
		// 	url:"http://localhost:8080"
		// })
	],
	module:{//设定加载器
		loaders:[
		    //暴露全局变量
		    //设定babel
			{
				test:/\.js[x]?$/,
				exclude:/node_modules/,
				loader:'babel',
				query:{
					presets:["es2015","react"]
				}
			},
			//css-loader
			{
				test:/\.css$/,
				loader:"style-loader!css-loader!postcss-loader"
			},
			//Image loader
			{
				test:/\.(png|jpg)$/,
				loader:"url-loader?limit=8192&name=imgs/[name]-[hash].[ext]"
			},
			//加载字体图标
			{
				test:/\.woff|\.svg|\.eot|\.ttf/,
				loader:'url?prefix=font/&limit=10000'
			}
		]
	},
	postcss:function(){
		return [require("autoprefixer"),require("precss")];
	}
};


































