let path = require('path');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/templates/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: __dirname + '/static/js/index.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	output: {
		path: path.join(__dirname, 'static', 'build'),
		filename: 'transformed.js'
	},
	plugins: [HTMLWebpackPluginConfig]
};