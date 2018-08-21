var webpack = require('webpack');  
var WebpackDevServer = require('webpack-dev-server');  
var config = require('../../../webpack.local');
var kill = require('kill-port');

var port = 3000; //Getting an error running webpack? maybe there's something (e.g. an old server) still running on this port, go kill it!

new WebpackDevServer(webpack(config), {  
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    headers:{'Access-Control-Allow-Origin':'*'}
}).listen(port, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    
    console.log('Listening at localhost:3000');
});
