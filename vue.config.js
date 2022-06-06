module.exports = {
    configureWebpack: {
      // other webpack options to merge in ...
    },
    devServer: {
        host: 'localhost',
        hot: true,
        disableHostCheck: true,
    },
    publicPath: '/chiMooChi/'
    // publicPath: process.env.NODE_ENV === 'production'
    // ? '/chiMooChi/'
    // : '/'
};  