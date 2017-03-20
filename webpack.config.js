module.exports = {
	entry: {
		'main' : './ServerApp/Server.ts',
		'www/app': './ClientApp/Client.ts'
	},
	output: {
		path: './',
		filename: '[name].js'
	},
	resolve: {
		extensions: [".ts"]
	},
	module: {
		loaders: [
			{
				test: /\.(ts)$/,
				exclude: /node_modules/,
				loader: 'ts-loader'
			}
		]
	}
};
