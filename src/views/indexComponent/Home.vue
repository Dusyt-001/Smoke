<template>
  <div class="home">
    <div>
      <van-search placeholder="请输入搜索关键词" />
    </div>
    <div class="banner-box">
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <img
              class="auto-img"
              src="https://i2.wp.com/wp-corp.qoo-app.com/wp-content/uploads/2019/05/19052904314010.jpg?resize=1920%2C1080"
              alt
            />
          </van-swipe-item>
          <van-swipe-item>
            <img
              class="auto-img"
              src="http://222.186.12.239:10010/dianyidnegz_20181105/desk_001.jpg"
              alt
            />
          </van-swipe-item>
          <van-swipe-item>
            <img
              class="auto-img"
              src="http://wap.ycwb.com/pic/2019-04/04/af6c1e34-9982-4bd6-8c77-ad015f80f7696ef93e68-fcd8-4366-ad9a-9f836e6756e2.jpg"
              alt
            />
          </van-swipe-item>
           <van-swipe-item>
            <img
              class="auto-img"
              src="http://pic1.win4000.com/pic/4/8c/4fcab668f0.jpg"
              alt
            />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <!-- 新片榜 -->
    <div class="new-movie">
      <div class="new-movie-title">
        <span class="fl">新片榜</span>
        <span class="fr" @click="changeNewMovieData">换一换</span>
      </div>
      <div class="new-movie-content">
        <div class="new-movie-box clearfix">
          <div
            class="new-movie-item"
            v-for="(item, index) in showNewMovieData.data"
            :key="index"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})"
          >
            <div class="new-movie-img">
              <img class="auto-img" :src="item.images.small" alt />
            </div>
            <div class="new-movie-name one-text">{{item.title}}</div>
            <div class="star-box">
              <div class="fl clearfix star-box-count">
                <!-- 灰星 -->
                <div ref="noactivestar" class="noactive-star">
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                </div>
                <!-- 黄星 -->
                <div class="active-star" :style="{width: item.width + 'px'}">
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                </div>
              </div>
              <div class="fl star-score">{{item.rating.average}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="new-movie-title">
        <span class="fl">本周口碑榜</span>
      </div>
      <div class="new-movie-content">
        <div class="new-movie-box2 clearfix">
          <div
            class="new-movie-item"
            v-for="(item, index) in StorageSale"
            :key="index"
            :id="item.subject.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.subject.id}})"
          >
            <div class="new-movie-img">
              <img class="auto-img" :src="item.subject.images.small" alt />
            </div>
            <div class="new-movie-name one-text">{{item.subject.title}}</div>
            <div class="star-box">
              <div class="fl clearfix star-box-count">
                <!-- 灰星 -->
                <div ref="noactivestar" class="noactive-star">
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                </div>
                <!-- 黄星 -->
                <div class="active-star" :style="{width:item.subject.rating.average * 6+'px'}">
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                </div>
              </div>
              <div class="fl star-score">{{item.subject.rating.average}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="new-movie-title">
        <span class="fl">Top20</span>
      </div>
      <div class>
        <div class="new-movie-box3 clearfix">
          <div
            class="new-movie-item"
            v-for="(item, index) in StorageSearch"
            :key="index"
            :id="item.id"
            @click="viewMovieDetail({name: 'movieDetail', params: {id: item.id}})"
          >
            <div class="new-movie-img">
              <img class="auto-img" :src="item.images.small" alt />
            </div>
            <div class="new-movie-name one-text">{{item.title}}</div>
            <div class="star-box">
              <div class="fl clearfix star-box-count">
                <!-- 灰星 -->
                <div ref="noactivestar" class="noactive-star">
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                </div>
                <!-- 黄星 -->
                <div class="active-star" :style="{width:item.rating.average * 6+'px'}">
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                  <span>
                    <van-icon name="star" />
                  </span>
                </div>
              </div>
              <div class="fl star-score">{{item.rating.average}}</div>
            </div>
          </div>
        </div>
      </div>
      <p class="txt">没有更多数据可加载了</p>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { createNamespacedHelpers } from "vuex";
import axios from "axios";
const { mapState } = createNamespacedHelpers("homeModule");

export default {
  name: "home",

  computed: {
    ...mapState([
      "baseUrl",
      "newMovieData",
      "showNewMovieData",
      "StorageSale",
      "StorageSearch",
      "isHasData",
      "isInit"
    ])
  },

  methods: {
    //换一换数据
    changeNewMovieData() {
      if (this.isHasData) {
        //提交换一换数据
        this.$store.commit("homeModule/toggleNewMovieData");
      }
    },

    //查看电影详情
    viewMovieDetail(o) {
      this.$router.push(o);
    },
    Mycreated() {
      let self = this;

      //获取用户位置
      $.ajax({
        type: "GET",
        url: "http://baobab.kaiyanapp.com/api/v5/index/tab/discovery",
        data: {},
        dataType: "jsonp",
        success: function(data) {
          // console.log(data);
        }
      });
    }
  },

  created() {
    // this.Mycreated()
    if (!this.isInit) {
      return;
    }
    //开启加载提示
    this.$toast.loading({
      duration: 0,
      message: "加载中..."
    });

    // 同时请求多个接口 http://www.arthurdon.top:3000/mv/url?id=5436712
    axios
      .all([
        axios.get(this.baseUrl + "/new_movies"),
        axios.get(this.baseUrl + "/weekly"),
        axios.get(this.baseUrl + "/top250"),
        axios.get("https://api.apiopen.top/videoCategory")
      ])

      .then(
        axios.spread((userResp, reposResp, top250, apiopen) => {
          // console.log(apiopen);
          // 上面两个请求都完成后，才执行这个回调方法
          userResp.data.subjects.forEach(v => {
            v.width = 0;
          });
          //提交actions

          this.$store
            .dispatch("homeModule/getNewMovieData", userResp.data.subjects)
            .then(() => {
              //根据星级平均分设置宽度
              let width = this.$refs.noactivestar[0].clientWidth;

              //提交modifyNewMovieData
              this.$store.commit("homeModule/modifyNewMovieData", width);
              this.$toast.clear();
            });
          // 提交第二个榜单数据
          this.$store.commit("homeModule/getSale", reposResp.data.subjects);
          this.$store.commit("homeModule/Search", top250.data.subjects);
        })
      );
  }
};
</script>
<style lang="less" scoped>
.txt {
  text-align: center;
  font-size: 12px;
  color: #aaa;
  margin: 10px 0;
}
.home {
  .star-box-count {
    position: relative;
    width: 60px;
    margin-right: 5px;

    span {
      position: absolute;
      width: 14px;
      height: 14px;
      top: 2px;
      font-size: 12px;
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(2) {
        left: 12px;
      }
      &:nth-child(3) {
        left: 24px;
      }
      &:nth-child(4) {
        left: 36px;
      }
      &:nth-child(5) {
        left: 48px;
      }
    }
  }
  .noactive-star {
    height: 14px;
    position: relative;
    color: #e5e5e5;
  }

  .active-star {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 14px;
    color: #fdc03d;
    overflow: hidden;
  }

  .star-score {
    width: 24px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    color: #fdc03d;
  }
  .banner-box {
    background-color: #fff;
    padding: 10px;
  }
  .star-box {
    width: 90px;
    margin: 0 auto;
    overflow: hidden;
  }
  .banner {
    border-radius: 10px;
    overflow: hidden;
    img {
      height: 160px;
    }
  }
  .new-movie {
    padding: 0 10px 10px;
    margin-top: 10px;
    background-color: #fff;
  }
  .new-movie-title {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f2f2f2;
    > span:nth-child(1) {
      color: #070707;
      font-size: 16px;
      font-weight: 600;
    }

    > span:nth-child(2) {
      color: #92835a;
      font-size: 14px;
    }
  }

  .new-movie-content {
    overflow-x: auto;
    margin: 10px 0;
    overflow-y: hidden;
  }
  .new-movie-box {
    width: 950px;
    > .new-movie-item {
      float: left;
      width: 110px;
      margin-right: 10px;
    }
    > .new-movie-item:last-child {
      margin-right: 0px;
    }
  }
  .new-movie-box2 {
    width: 1190px;
    > .new-movie-item {
      float: left;
      width: 110px;
      margin-right: 10px;
    }
    > .new-movie-item:last-child {
      margin-right: 0px;
    }
  }
  .new-movie-box3 {
    width: 360px;
    > .new-movie-item {
      float: left;
      width: 110px;
      margin-right: 10px;
    }
    > .new-movie-item:last-child {
      margin-right: 0px;
    }
  }
  .new-movie-img {
    border-radius: 10px;
    overflow: hidden;
    width: 110px;
    height: 135px;
    img {
      height: 100%;
    }
  }
  .new-movie-name {
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #000000;
  }
}
</style>