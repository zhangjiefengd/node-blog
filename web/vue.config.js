
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/web' : '/',
  outputDir: 'web',
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html'
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT'
    }
  },
  devServer: {
    proxy: 'http://localhost:8080'
  }
}