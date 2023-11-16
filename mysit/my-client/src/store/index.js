import { Store, install } from "vuex";
import Vue from "vue";
import banner from "@/store/banner";
import setting from "@/store/setting";
import about from "@/store/about";
import project from "@/store/project";
if (!window.Vuex) {
  install(Vue);
}

const store = new Store({
  modules: {
    banner,
    setting,
    about,
    project,
  },
  strict: true,
});
window.store = store;
export default store;
