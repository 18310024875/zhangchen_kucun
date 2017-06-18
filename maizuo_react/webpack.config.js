var webpack = require('webpack') ;
module.exports = {
    entry:__dirname+'/src/router_ensure.jsx',
	output:{
		path:__dirname+'/dist/',
        publicPath:'/dist/',  //代码分割必须配置!!!分割后jsonp默认地址 开发环境需要替换http://xxx.com/dist/
		filename:'[name].js', //主入口 默认main.js
        chunkFilename:'[id]--.index.js?[chunkhash]', //分割的文件名
	},
	devServer:{
        historyApiFallback: true, //和hashHistory一样
        contentBase: "./", //本地服务器所加载的页面所在的目录
		port:'9999',
		// host:'192.168.1.96'
	},
	module: {
        rules: [
        // jsx
        	{
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: [
                	{
                  	   loader: 'babel-loader',
                  	   options: {
                        	presets: ['babel-preset-es2015','babel-preset-react']
                   	   }
               		}
                ]
            }, 
        // css
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                	{
                		loader:'style-loader'
                	},
                    {
                        loader: 'css-loader',
                        options: { modules: false }
                    }
                ]
            }, 
        // less
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                	{
                		loader:'style-loader'
                	},
                    {
                        loader: 'css-loader',
                        options: { modules: false }
                    },
                    {
                        loader: 'less-loader',
                        options: { modules: false }
                    }
                ]
            }, 
        // img
            {
                test: /\.(jpg|png|gif)$/,
                exclude: /node_modules/,
                use: [
                	{
                  	  loader: 'url-loader?limit=20480'//小于20k 转码
                	}
                ]

            },
        ] // rules over
    },
    // plugins: [
    //     //提取公共模块
    //     entry:{main:__dirname+'/src/router_ensure.jsx',vendor:['react']}, //提取公模块需多入口
    //     new webpack.optimize.CommonsChunkPlugin({
    //       names: ['vendor'],
    //       filename: '[name].js'
    //     }),
    //   //生产环境
    //     //压缩代码
    //     new webpack.optimize.UglifyJsPlugin({minimize:true}),
    //     new webpack.DefinePlugin({
    //        "process.env":{
    //             NODE_ENV:JSON.stringify('production')
    //        }
    //     })    
    // ]
}