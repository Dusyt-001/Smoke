import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import VueAxios from 'vue-axios'

import {
  Field,
  CellGroup,
  Button,
  Toast,
  Tabbar,
  TabbarItem,
  Icon,
  Tabs,
  Tab,
  Swipe,
  SwipeItem,
  Search,
  NavBar,
  Grid,
  GridItem,
  Cell,
  SubmitBar,
  Popup,
  CouponCell,
  CouponList,
  ActionSheet,
  AddressEdit,
} from 'vant'

import 'lib-flexible/flexible'

Vue.use(VueAxios, axios)

Vue
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Tabs)
  .use(Tab)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(NavBar)
  .use(Grid)
  .use(GridItem)
  .use(Cell)
  .use(SubmitBar)
  .use(Popup)
  .use(CouponCell)
  .use(CouponList)
  .use(ActionSheet)
  .use(AddressEdit )
 

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
