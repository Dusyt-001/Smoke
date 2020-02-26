<template>
  <div class="movie">
    <van-tabs
      class="tabssz"
      line-height="2px"
      v-model="activeName"
      :border="false"
      color="#1989fa"
      title-active-color="#1989fa"
    >
      <van-tab title="正在热映" name="a">
        <div ref="moviebox" class="movie-box" @scroll="lazyLoad">
          <div
            class="movie-item clearfix"
            v-for="(item, index) in movieData.data.subjects"
            :key="index"
            ref="movieitem"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})"
          >
            <div class="fl movie-img">
              <img class="auto-img" :src="item.images.medium" alt />
            </div>
            <div class="fl movie-info">
              <div class="one-text">
                <span class="fl">{{item.title}}</span> <div class="fr movie-score">
                <span>{{item.rating.average}}</span>
              </div>
              </div>
               <div class="one-text">时长：{{item.durations[0]}}</div>
              <div class="one-text">角色：{{ item.avatarsInfo}}</div>
              <div class="one-text">类型：{{item.genresInfo}}</div>
              <div class="one-text">上映时间：{{item.mainland_pubdate}}</div>
              <div class="buy-btn">
                <van-button
                  class="button"
                  round
                  size="mini"
                  type="info"
                  @click.stop="buyTick(item.id)"
                >选座购票</van-button>
              </div>
            </div>
            <!-- <div class="fl buy-info">
              
              <div class="buy-btn">
                <van-button round size="mini" type="info" @click.stop="buyTick(item.id)">购票</van-button>
              </div>
            </div>-->
          </div>
          <p class="tip-text" v-if="!isHas">没有更多数据可加载了</p>
        </div>
      </van-tab>
      <van-tab title="即将上映" name="b">
          <div ref="moviebox" class="movie-box" @scroll="lazyLoad">
          <div
            class="movie-item clearfix"
            v-for="(item, index) in comingSoon"
            :key="index"
            ref="movieitem"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})"
          >
            <div class="fl movie-img">
              <img class="auto-img" :src="item.images.medium" alt />
            </div>
            <div class="fl movie-info">
              <div class="one-text">
                <span class="fl">{{item.title}}</span> <div class="fr movie-score">
                <span>{{item.rating.average}}</span>
              </div>
              </div>
               <div class="one-text">时长：{{item.durations[0]}}</div>
              <div class="one-text">角色：{{ item.avatarsInfo}}</div>
              <div class="one-text">类型：{{item.genresInfo}}</div>
              <div class="one-text">上映时间：{{item.mainland_pubdate}}</div>
              <div class="buy-btn">
                <van-button
                  class="button"
                  round
                  size="mini"
                  type="info"
                  @click.stop="buyTick(item.id)"
                >订票</van-button>
              </div>
            </div>
          </div>
          <p class="tip-text" v-if="!isHas">没有更多数据可加载了</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import $ from "jquery";

import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("movieModule");

export default {
  name: "movie",

  data() {
    return {
      activeName: "a",
      comingSoon: {}
    };
  },

  computed: {
    ...mapState([
      "movieData",
      "params",
      "isHas",
      "isInit",
      "isInitial",
      "movieBox",
      "movieBoxData"
    ])
  },

  methods: {
    ComingSoon() {
      this.axios({
        //请求类型
        method: "GET",

        //请求地址
        url: "https://douban.uieee.com/v2/movie/coming_soon"

        //请求参数
      })
        .then(result => {
          //  console.log("result.data.subjects ==> ", result.data.subjects);
          
            result.data.subjects.forEach(v => {
            //合并电影类型
            v.genresInfo = v.genres.join(" / ");

            //合并演员
            v.avatarsInfo = "";
            v.casts.forEach(item => {
              v.avatarsInfo += item.name + " / ";
            });

            v.avatarsInfo = v.avatarsInfo.slice(0, -3);
          });
          this.comingSoon = result.data.subjects;
        })
        .catch(err => {});
    },
    getMovieData() {
      let self = this;

      this.$toast.loading({
        duration: 0,
        message: "加载中..."
      });

      //请求数据
      this.axios({
        //请求类型
        method: "GET",

        //请求地址
        url: "https://douban.uieee.com/v2/movie/in_theaters",

        //请求参数
        params: this.params
      })
        .then(result => {
          //  console.log("result.data.subjects ==> ", result.data.subjects);
          result.data.subjects.forEach(v => {
            //合并电影类型
            v.genresInfo = v.genres.join(" / ");

            //合并演员
            v.avatarsInfo = "";
            v.casts.forEach(item => {
              v.avatarsInfo += item.name + " / ";
            });

            v.avatarsInfo = v.avatarsInfo.slice(0, -3);
          });

          if (this.isInit) {
            let movieBox = this.$refs.moviebox;
            let movieBoxHeight = movieBox.clientHeight;
            this.$store.commit("movieModule/changeMovieBox", {
              movieBox,
              movieBoxHeight
            });
          }

          //提交修改movieData数据
          this.$store.commit("movieModule/changeMovieData", result);
          //取消加载提示
          this.$toast.clear();
        })
        .catch(err => {
          this.$toast.clear();
        });
    },

    //查看电影详情
    viewMovieDetail(o) {
      this.$router.push(o);
    },

    //滚动懒加载
    lazyLoad() {
      let self = this;

      if (!self.isHas) {
        return;
      }

      let timer = setTimeout(function() {
        for (let i = 1; i < self.movieBoxData.timers.length; i++) {
          clearTimeout(self.movieBoxData.timers[i]);
        }

        //获取底部导航高度
        let tabbarHeight = document.querySelector(".tab-bar").clientHeight;
        //

        let movieItem = self.$refs.movieitem[self.$refs.movieitem.length - 1];

        //获取元素距离可视区域顶部的距离
        let movieItemStyle = movieItem.getBoundingClientRect();

        let top = movieItemStyle.top;
        //

        let movieItemMarginBottom = parseFloat(
          getComputedStyle(movieItem).marginBottom
        );
        //

        let movieItemHeight = movieItemStyle.height;
        //

        let isPass =
          innerHeight -
            tabbarHeight -
            movieItemMarginBottom -
            movieItemHeight +
            50 >=
          top;

        //

        if (isPass) {
          //发起数据请求
          self.getMovieData();
        }

        self.$store.state.movieModule.movieBoxData.timers = [];
      }, 1000);

      self.$store.state.movieModule.movieBoxData.timers.push(timer);
      // self.timers.push(timer);
    },

    //购票
    buyTick(id) {
      this.$router.push({ name: "buyMovieTick", query: { id } });
    }
  },

  created() {
    this.ComingSoon();
    let self = this;

    //获取用户位置
    $.ajax({
      type: "GET",
      url: "https://apis.map.qq.com/ws/location/v1/ip",
      data: {
        key: "YYTBZ-GFSRX-JSX4Z-7PG44-Y6P2T-IIFD2",
        output: "jsonp"
      },
      dataType: "jsonp",
      success: function(data) {
        self.$store.commit(
          "movieModule/changeLocationCity",
          data.result.ad_info.city.replace(/市$/, "")
        );

        if (!self.isInitial) {
          return;
        }
        self.getMovieData();
      }
    });
  }
};
</script>
<style lang="less">
.van-ellipsis {
  font-size: 14px;
  font-weight: 600;
}
</style>
<style lang="less" scoped>
.movie {
  position: fixed;
  top: 40px;
  bottom: 50px;
  left: 0;
  right: 0;

  .van-tabs {
    position: static;
  }

  .tip-text {
    color: #aaa;
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    background-color: #fff;
  }
  .movie-box {
    padding: 10px 10px 10px 10px;
    // background-color: #fff;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
  .movie-item {
    margin-bottom: 5px;
    background-color: #fff;
    border-bottom: 2px solid #dfdfdf;
    padding: 8px;
  }
  .movie-img {
    width: 80px;
    height: 120px;
    img {
      border-radius: 5px;
    }
  }
  .movie-info {
    width: calc(~"100% - 120px");
    padding: 0 10px;
    position: relative;
    > div {
      &:nth-child(1) {
        font-size: 16px;
        font-weight: 600;
        color: #000;
      }
      &:nth-child(2) {
        font-size: 13px;
        line-height: 20px;
        color: #8f8e91;
      }
      &:nth-child(3) {
        font-size: 13px;
        color: #8f8e91;
      }
      &:nth-child(4) {
        font-size: 13px;
        color: #8f8e91;
      }
      &:nth-child(5) {
        font-size: 13px;
        color: #8f8e91;
      }
    }
  }
  .movie-score {
    font-size: 14px;
    color: #8f8e91;
    > span {
      font-size: 12px;
      color: #ffab60;
    }
  }
  .buy-btn {
    text-align: right;
    margin-top: -30px;
    button {
      height: 25px;
      width: 65px;
          position: absolute;
    right: 0;
    }
  }
}
</style>