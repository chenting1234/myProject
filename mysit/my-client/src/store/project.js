import { getProjects } from "@/api/project";
import { Server_URL } from "@/serverUrl";
export default {
  namespaced: true,
  state: {
    isloading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.isloading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchProject(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      ctx.commit("setLoading", true);
      const resp = await getProjects();
      // resp.thumb = Server_URL + resp.thumb;
      const data = resp.map((item) => {
        return {
          ...item,
          thumb: Server_URL + item.thumb,
        };
      });
      console.log(data);
      ctx.commit("setData", data);
      ctx.commit("setLoading", false);
    },
  },
};
