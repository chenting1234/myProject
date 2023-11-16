import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";
if (!window.VueRouter) {
  Vue.use(VueRouter); //使用一个vue插件
}

const router = new VueRouter({
  //路由配置规则
  routes,
  mode: "history",
});

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    titleController.setRouteTitle(to.meta.title);
  }
});
export default router;
