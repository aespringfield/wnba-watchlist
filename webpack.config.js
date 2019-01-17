const path = require('path');

module.exports = (options) => {
    return {
        entry: {
            index: path.join(__dirname, 'client/views/index.js')
        },
        output: {
            path:  path.join(__dirname, 'server/public/views'),
            filename: '[name].js'
        },
        // Specify new rule for loading JS files
        module: {
            // Load all .js files with babel-loader
            // --> transform into browser-safe ES5
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/react']
                    },
                }
            ]
        }
    }
}