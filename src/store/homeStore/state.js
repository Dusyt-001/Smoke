export const state = {
  //请求基础路径
  baseUrl: 'https://douban.uieee.com/v2/movie',

  //所有新片榜数据
  newMovieData: [],

  // 展示新片榜数据
  showNewMovieData: {
    start: 0,
    end: 8,
    data: []
  },
  StorageSale:{},
  StorageSearch:{},
  //是否存在换一换数据
  isHasData: true,

  //是否初始化
  isInit: true
};