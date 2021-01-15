import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

// 300ms延迟
import fastclick from "fastclick";
fastclick.attach(document.body);

// 引入全局样式
import "./common/stylus/index";

// 引入vant的Swipe组件
import { Swipe, SwipeItem } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
