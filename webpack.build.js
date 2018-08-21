var webpack = require('webpack');  
var path = require('path');  
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

console.log("BUNDLING OUTPUT FOR ENVIRONMENT: "+ process.env.NODE_ENV);
var entryPoint =  './Scripts/_Source/index.ts';
var outFolder =  path.resolve(__dirname, "./Distribution"); 
var app =  [entryPoint]; 

//Plugin Definitions
var extractCSS = new ExtractTextPlugin({
            filename:"site.css",
            allChunks:true
        });
var optimizeCSS = new OptimizeCssAssetsPlugin({
    cssProcessorOptions:{discardComments:{removeAll:true}},
});
var environmentVariables = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) 
});
var uglifier = new UglifyJSPlugin({
    sourceMap:true,
//    uglifyOptions:{
//        mangle:{
//            keep_classnames: true
//        },
//        compress:{
//            keep_classnames:true
//        },
//        keep_classnames:true
//
//    }
});

//Plugin Implementation List
var webpackPlugins =  [extractCSS,optimizeCSS,environmentVariables,uglifier];

module.exports = {  
    mode: 'none',
    entry: {
        app
    },
    output: {
        path: outFolder,
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-decorators-legacy'],
                        presets:['env']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader:'ts-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                loader:  extractCSS.extract({
                    fallback:'style-loader', 
                    use:['css-loader','postcss-loader','sass-loader']
                })
            },
            {
                test: /\.css$/,
                loader:  extractCSS.extract({
                    fallback: 'style-loader',
                    use:[
                        {
                        loader: 'css-loader',
                            options:{
                                minimize:true,
                            }
                        },
                        'postcss-loader'
                    ]
                })

            },
            {
                test:/\.woff2?$|\.woff$|\.ttf$|\.eot$|\.svg$/, 
                loader:'url-loader'                 
            },
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