var autoprefixer = require('autoprefixer');
var postcss = require('postcss-scss');
module.exports = {
    parser: postcss,
    plugins: {
        autoprefixer: { browsers: ['last 2 versions'] }
    }
};