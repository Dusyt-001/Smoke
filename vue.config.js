const debug = process.env.NODE_ENV !== 'production'

module.exports = {



  publicPath: debug ? '/' : './',

// 不需要生产环境 source map , 可以将其设置 false 义加速生产环境构建

  productionSourceMap: debug ? true : false,
// css source map
  css: {
    sourceMap: debug ? true : false
  }


}
