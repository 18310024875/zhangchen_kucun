module.exports = {
	entry:__dirname+'/src/router.jsx',
	output:{
		path:__dirname,
		filename:'bundle.js'
	},
	devServer:{
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
                  	  loader: 'url-loader'
                	}
                ]

            },
        ] // rules over

    }
}