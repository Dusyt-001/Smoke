export const mutations = {

  //获取所有新片榜数据
  getNewMovieData(state, result) {

    //判断是否第一次请求数据
    if (state.isInit) {
      state.isInit = false;
    }

    state.newMovieData = result.concat();

    //截取数据
    state.showNewMovieData.data = state.newMovieData.slice(state.showNewMovieData.start, state.showNewMovieData.end);

    state.showNewMovieData.start = state.showNewMovieData.end;
    state.showNewMovieData.end += 8;

  },
  getSale(state, result){
    state.StorageSale = result
  },
  Search(state, result){
    state.StorageSearch = result

  },

  //newMovieData添加width属性
  modifyNewMovieData(state, width) {

    //根据星级平均分设置width
    state.newMovieData.forEach((v) => {
      v.width = v.rating.average / v.rating.max * width;
    })

   

    
    // 

  },

  // 换一换
  toggleNewMovieData(state) {
    //截取数据
    let data = state.newMovieData.slice(state.showNewMovieData.start, state.showNewMovieData.end);

    //获取截取数据数量
    let count = data.length;

    //如果不存在数据
    if (count == 0) {

      state.isHasData = false;

    } else if (count < 8) {
      //如果不足8条数据，需要将之前的数据移除前面count条数据,再往后面加入count条数据
      state.showNewMovieData.data.splice(0, count);
      state.showNewMovieData.data.push(...data);
      state.isHasData = false;

    } else {
      state.showNewMovieData.data = data;
    }

    
  }

};