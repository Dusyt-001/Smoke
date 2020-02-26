<template>
  <div class="mine">
    <div class="mine-bg">
      <div class="bg-flower"></div>
      <span class="fr logout" @click="login">{{userInfo.loginText}}</span>
    </div>
    <div class="mine-box">
      <div class="mine-boxing">
        <div class="user-boxing">
          <div class="user-logo">
            <img class="auto-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576146976323&di=2bf0c013cf2cf1d6ab616cf1c30f9c0e&imgtype=0&src=http%3A%2F%2F2f.zol-img.com.cn%2Fproduct%2F93%2F431%2FceAydOgfHTihE.jpg" alt="">
          </div>
          <div class="username">{{userInfo.username}}</div>
        </div>
        <div class="user-box">
          <div></div>
          <!-- 头像 -->
          <div class="user-avatar"></div>
        </div>

        <div class="item">
          <van-grid :column-num="column">
            <van-grid-item icon="coupon-o" text="电影票" />
            <van-grid-item @click="viewLikeMovie" icon="like-o" text="我的收藏" />
          </van-grid>
        </div>

        <div>
          <van-cell title="个人信息" is-link @click="showPopup" icon="contact">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
              slot="right-icon"
              name="arrow"
              style="line-height: inherit;"
            />
          </van-cell>
          <van-popup v-model="show"  position="bottom"
  :style="{ height: '30%' }"><van-cell title="姓名" /></van-popup>
          
          <van-coupon-cell
           icon="bill-o"
           :coupons="coupons"
           :chosen-coupon="chosenCoupon"
           @click="showList = true"/>
         <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"/>
        </van-popup>


           <van-cell title="我的钱包"  icon="balance-pay">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
              slot="right-icon"
              name="arrow"
              style="line-height: inherit;"
            />
            <div><p>余额0：00</p></div>
          </van-cell>
           <van-cell title="会员权益" icon="gem-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
              slot="right-icon"
              name="arrow"
              style="line-height: inherit;"
            />
            <div><p>非会员</p></div>
          </van-cell>
          <van-cell title="积分商城" icon="points">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
              slot="right-icon"
              name="arrow"
              style="line-height: inherit;"
            />
            <div><p>50</p></div>
          </van-cell>  
           <van-cell title="投诉建议" icon="records">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
              slot="right-icon"
              name="arrow"
              style="line-height: inherit;"
            />
          </van-cell>
          <van-cell title="设置" icon="setting-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon
              slot="right-icon"
              name="arrow"
              style="line-height: inherit;"
            />
          </van-cell>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('mineModule');
  const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
};

  export default {
    name: 'mine',

    data() {
      return {
        column: 2,
        show:false,
        showList:false,
        chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      
      };
    },

    computed: {
      ...mapState(['userInfo'])
    },

    methods: {
       onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
      showPopup() {
      this.show = true;
    },

      //退出或者登录
      login() {
        let userStatus = localStorage.getItem('user');

        if (userStatus) {
          let userInfo = JSON.parse(userStatus);

          if (userInfo.isLogin) {
            

            localStorage.removeItem('user');

            this.$store.commit('mineModule/changeUserInfo', {loginText: '登录', username: ''});

          } else {
            this.$router.push({name: 'login'});
          }


        } else {
          this.$router.push({name: 'login'});
        }
      },

      //查看我的收藏电影
      viewLikeMovie() {
        //验证是否登录
        let userStatus = localStorage.getItem('user');

        if (userStatus) {
          let userInfo = JSON.parse(userStatus);

          //如果登录
          if (userInfo.isLogin) {

            

            this.$router.push({name: 'likeMovie'});

          } else {
            //如果未登录
            this.$toast('请先登录');
          }

        } else {
          //未登录
          this.$toast('请先登录');
        }
      }
    },
    
    created() {

      

      //获取用户信息
      let userStatus = localStorage.getItem('user');

      if (userStatus) {
        let user = JSON.parse(userStatus);

        if (user.isLogin) {

          this.$store.commit('mineModule/changeUserInfo', {loginText: '退出', username: user.username});

        }


      }

    }
  }
</script>

<style lang="less" scoped>
  .mine{
    
    .logout{
      color: #fff;
      font-size: 14px;
      margin-right: 20px;
      margin-top: 20px;
    }
    .item{
      color: #666;
      background-color: #000000;
    }
    .mine-bg{
      height: 75px;
      background-color: #000000;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      position: relative;
      .bg-flower{
        position: absolute;
        top: 20px;
        left: 20px;
        width: 120px;
        height: 120px;
        background: url("../../assets/images/fire.png") no-repeat center center;
        background-size: 120px 120px;
      }
    }
    .mine-box{
      background-color: #fff;
      .mine-boxing{
        // border-top: 5px solid #fff;
        position: relative
      }
      .user-boxing{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        // height: 80px;
        background-color: #000000;
        z-index: 2;
        .user-logo{
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          left: 40px;
          top: -40px;
          overflow: hidden;
        }
      }
      .user-box{
        height: 44px;
        background-color: #826547;
        position: relative;
        z-index: 1;
        .user-avatar{
          position: absolute;
          left: 40px;
          top: -40px;
          width: 80px;
          height: 80px;
          background-color: #fff;
          border-radius: 50%;
          box-shadow: 0px 0px 0px 5px #fff;
        }
      }
    }
    .username{
      margin-left: 150px;
      font-size: 18px;
      color: #E6B674;
      padding: 10px 0;
    }
  }
</style>