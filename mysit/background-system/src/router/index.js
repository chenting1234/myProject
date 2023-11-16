import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
Vue.use(Router);

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    //切换路由的时候平滑滚动
    scrollBehavior: () => ({ y: 0 }),
    routes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
