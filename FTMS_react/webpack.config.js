var webpack = require('webpack') ;

module.exports = {
	entry:__dirname+'/app/router.jsx',
	output:{
		path:__dirname,
		filename:'bundle.js'
	},
	devServer:{
		port:'8888',
		// host:'192.168.1.96'
        
	},
    resolve: { // 使用resolve import的时候可以不带后缀
        extensions: ['.js','.jsx']
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
                  	  loader: 'url-loader'
                	}
                ]

            },
        ] // rules over

    },

    // // 生产环境
    // plugins: [
    //     //压缩代码
    //     new webpack.optimize.UglifyJsPlugin({minimize:true}),
    //     new webpack.DefinePlugin({
    //        "process.env":{
    //             NODE_ENV:JSON.stringify('production')
    //        }
    //     })    
    // ]
}
