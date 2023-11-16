import request from "@/utils/request";

/**
 * 获取首页标语
 * @returns
 */
export function getBanner() {
  return request({ url: "/api/banner", method: "get" });
}

/**
 * 设置首页标语
 * @param {String} data
 */
export function setBanner(data) {
  request({ url: "/api/banner", method: "post", data });
}
