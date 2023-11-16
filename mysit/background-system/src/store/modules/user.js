import api from "@/api/index";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    user: null,
    loginId: "",
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_USER: (state, payload) => {
    state.user = payload;
  },
  SET_LOGINID: (state, payload) => {
    state.loginId = payload;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginId, loginPwd, captcha, remember } = userInfo;
    return new Promise(async (resolve, reject) => {
      const resp = await api.user.login({
        loginId: loginId.trim(),
        loginPwd: loginPwd.trim(),
        captcha: captcha.trim(),
        remember,
      });
      let result = null;
      if (typeof resp === "string") {
        result = JSON.parse(resp);
      } else {
        result = resp;
      }

      if (result.data) {
        //登录成功
        commit("SET_USER", result.data);
        resolve();
      } else {
        reject(result);
      }
    });
  },

  // get user info
  getInfo({ commit }) {
    return new Promise(async (resolve, reject) => {
      const resp = await api.user.getInfo();

      let result = null;
      if (typeof resp === "string") {
        result = JSON.parse(resp);
      } else {
        result = resp;
      }
      result.data.avatar =
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif";
      if (!result.data) {
        return reject(result.msg);
      }
      const { loginId, name, avatar } = result.data;
      commit("SET_LOGINID", loginId);
      commit("SET_NAME", name);
      commit("SET_AVATAR", avatar);
      resolve(result.data);

      // getInfo(state.token)
      //   .then((response) => {
      //     const { data } = response;

      //     if (!data) {
      //       return reject("Verification failed, please Login again.");
      //     }

      //     const { name, avatar } = data;

      //     commit("SET_NAME", name);
      //     commit("SET_AVATAR", avatar);
      //     resolve(data);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // 移除token
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
