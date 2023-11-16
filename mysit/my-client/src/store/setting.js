import { getSettings } from "@/api/setting";
import { titleController } from "@/utils";
import { Server_URL } from "@/serverUrl";
export default {
  namespaced: true,
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
    async fetchSettings(context) {
      context.commit("setLoading", true);
      const resp = await getSettings();
      resp.avatar = Server_URL + resp.avatar;
      resp.qqQrCode = Server_URL + resp.qqQrCode;
      resp.weixinQrCode = Server_URL + resp.weixinQrCode;
      context.commit("setData", resp);
      context.commit("setLoading", false);

      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    },
  },
};
