import request from "@/utils/request";

/**
 * 分页获取评论
 * @param {} page
 * @param {*} limit
 * @param {*} keyword
 * @returns
 */
export function getMessage(page = 1, limit = 10, keyword) {
  return request({
    url: "/api/message",
    method: "get",
    params: { page, limit },
  });
}

/**
 * 提交评论
 * @param {*} data
 * @returns
 */
export function submitMessage(data) {
  return request({ url: "/api/message", method: "post", data });
}

/**
 * 删除评论
 * @param {*} id
 * @returns
 */
export function deleteMessage(id) {
  return request({ url: `/api/message/${id}`, method: "delete" });
}
