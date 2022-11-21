const { resolve } = require('path')
const CracoLessPlugin = require('craco-less')

module.exports = {
	plugins: [{ plugin: CracoLessPlugin }],
	webpack: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
}
