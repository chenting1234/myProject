import request from "@/utils/request";

export function getComment(page = 1, limit = 10) {
  return request({
    url: "/api/comment",
    method: "GET",
    params: {
      page,
      limit,
    },
  });
}

// 删除评论
export function deleteComment(id) {
  return request.delete(`/api/comment/${id}`);
}
