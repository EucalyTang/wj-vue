module.exports = {
	//publicPath: './',
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:8443',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.esm.js'
			}
		}
	},
}
