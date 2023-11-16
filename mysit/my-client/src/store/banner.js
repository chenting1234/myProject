import { getBanners } from "@/api/banner";
import { Server_URL } from "@/serverUrl";
export default {
  namespaced: true, //开启命名空间
  state: {
    isLoading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchBanner(context) {
      if (context.state.data.length) {
        return;
      }
      context.commit("setLoading", true);
      const resp = await getBanners();
      const data = resp.map((item) => {
        return {
          ...item,
          bigImg: Server_URL + item.bigImg,
          midImg: Server_URL + resp.midImg,
        };
      });

      context.commit("setData", data);

      context.commit("setLoading", false);
    },
  },
};
