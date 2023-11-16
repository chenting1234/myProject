//入口文件
// import "./mock";
import Vue from "vue";
import App from "./App.vue";
import "./style/global.less";
import "./eventBus";
import router from "./router";
import store from "./store";

if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

import { showMessage } from "./utils";
Vue.prototype.$showMessage = showMessage;

//注册自制指令
import vLoading from "@/directive/loading";
import vLazy from "@/directive/lazy";
Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
