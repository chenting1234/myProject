import Vue from "vue";

const listencers = {};

Vue.prototype.$bus = {
  //监听事件
  $on(eventName, handle) {
    //监听对象里面没有事件，加到对象里面
    if (!listencers[eventName]) {
      listencers[eventName] = new Set();
    }
    listencers[eventName].add(handle);
  },
  //取消监听
  $off(eventName, handle) {
    if (!listencers[eventName]) {
      return;
    }
    listencers[eventName].delete(handle);
  },
  //触发事件
  $emit(eventName, ...args) {
    if (!listencers[eventName]) {
      return;
    }
    for (const handle of listencers[eventName]) {
      handle(...args);
    }
  },
};
// const app = new Vue({});
// Vue.prototype.$bus = app;
export default Vue.prototype.$bus;
/**
 * 事件名：mainScroll
 * 含义：主区域滚动条变化后触发
 * 参数：
 * -滚动的dom元素，如果时undefined，则dom元素已经不存在
 *
 * 事件名：setMainScroll
 * 含义：当需要设置主区域滚条位置时触发
 *
 */
