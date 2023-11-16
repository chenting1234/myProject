import { getAbout } from "@/api/about";
export default {
  namespaced: true, //开启命名空间
  state: {
    isLoading: false,
    data: "",
  },
  mutations: {
    setLading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchAbout(context) {
      context.commit("setLading", true);
      const resp = await getAbout();
      context.commit("setData", resp);
      context.commit("setLading", true);
    },
  },
};
