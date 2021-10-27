const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  outputDir: 'generated-html',
  publicPath: process.env.NODE_ENV === 'production' ? '/modules/cbadmin-vue-argon/generated-html/' : '/',
  devServer: {
    host: '127.0.0.1',

    proxy: {
      "^(\/(cbadmin|akibasedam))?\/(api|auth|config)\/*": {
        target: process.env.VUE_APP_DEV_API_HOST,
        changeOrigin: true,
        secure: false,
        /*pathRewrite: {'^/api/*' : '/api/'},*/
        logLevel: "debug"
      }
    }
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'cbadmin-vue-argon',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
