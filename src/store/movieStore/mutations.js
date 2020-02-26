export const mutations = {

  changeMovieData(state, result) {

    if (state.isInit) {
      state.isInit = false;
    }

    if (state.isInitial) {
      state.isInitial = false;
    }

    if (result.data.subjects.length < 10) {
      state.isHas = false;
    }

    //将每次请求的数据推进state.movieData.data.subjects数组中
    state.movieData.data.subjects.push(...result.data.subjects);

    //每次请求完成后，修改请求数据的开始截取位置
    state.params.start += state.params.count;

    // 
    // 
  },

  changeMovieBox(state, o) {
    state.movieBoxData.movieBox = o.movieBox;
    state.movieBoxData.movieBoxHeight = o.movieBoxHeight;
  },

  // 修改定位城市
  changeLocationCity(state, city) {
    state.params.city = city;

    
  },


   //  即将上映电影
   changeComingMovieData(state, event) {

    if (state.isInit) {
      state.isInit = false;
    }
    
    if (event.data.subjects.length < 10) {
      state.isHas = false;
    }
    
    //将每次请求的数据推进state.movieData.data.subjects数组中
    state.comingData.data.subjects.push(...event.data.subjects);
    
    //每次请求完成后，修改请求数据的开始截取位置
    state.params.start += state.params.count;
    
    // console.log('state.comingData ==> ', state.comingData);
    // console.log('state.params ==> ', state.params);
    }

};