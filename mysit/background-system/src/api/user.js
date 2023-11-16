import request from "@/utils/request";

/**
 * 登录
 * @param {Object} data
 * @returns
 */
export function login(data) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data,
  });
}

/**
 * 获取登录信息
 * @param {String} token
 * @returns
 */
export function getInfo() {
  return request({
    url: "/api/admin/whoami",
    method: "get",
  });
}

/**
 * 退出登录
 * @returns
 */
export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}

/**
 * 修改管理员信息
 * @param {*} data
 * @returns
 */
export function setUser(data) {
  return request({ url: "/api/admin", method: "put", data });
}
