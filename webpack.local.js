var webpack = require('webpack');  
var path = require('path');  

console.log("BUNDLING OUTPUT FOR ENVIRONMENT: "+ process.env.NODE_ENV);
var entryPoint = './Scripts/Library/HotReload/reload.js';
var outFolder = path.resolve(__dirname, "./wwwroot/Distribution");
var app = ['webpack-dev-server/client?http://0.0.0.0:3000', 'webpack/hot/only-dev-server', entryPoint];

//Plugin Definitions
var hotModuleReplacement = new webpack.HotModuleReplacementPlugin();
var environmentVariables = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) 
});
var namedModules = new webpack.NamedModulesPlugin();


//Plugin Implementation List
var webpackPlugins = [hotModuleReplacement, environmentVariables, namedModules];

module.exports = {
    mode: 'none',
    entry: {
        app
    },
    output: {
        path: outFolder,
        filename: "bundle.js",
        publicPath: 'http://localhost:3000/static/'
    },
    devtool: "inline-source-map" ,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-decorators-legacy'],
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: [
//                    {
//                        loader: 'babel-loader',
//                        options: {
//                            presets: ['env'],
//                        }
//                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            
            {
                test: /\.css$/,
                loader:  'style-loader!css-loader!postcss-loader' 
            },
            {
                test:/\.woff2?$|\.woff$|\.ttf$|\.eot$|\.svg$/, 
                loader:'url-loader'                 
            }
        ]
    
    },
    plugins: webpackPlugins,
    resolve: {
        extensions: [".ts",".js",".scss",".css"]
    },

    devServer: {
        headers:{"Access-Control-Allow-Origin":"*"}
    }
};