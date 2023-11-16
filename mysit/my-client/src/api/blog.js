import request from "./request";

/**
 * 获取博客列表
 * @returns
 */
export async function getBlogs(
  params = { page: 1, limit: 10, categoryid: -1 }
) {
  return await request.get("/api/blog", { params });
}

/**
 * 获取博客分类
 * @returns
 */
export async function getBlogtype() {
  return await request.get("/api/blogtype");
}

/**
 * 获取单个博客信息
 * @param {*} id
 * @returns
 */
export async function getBlog(id) {
  return await request.get(`/api/blog/${id}`);
}
/**
 * 提交博客
 * @param {*} commentInfo
 * @returns
 */
export async function postComment(commentInfo) {
  return await request.post("/api/comment", commentInfo);
}

/**
 * 分页获取评论
 * @param {*} page
 * @param {*} limit
 * @param {*} blogid
 * @returns
 */
export async function getComment(blogid, page = 1, limit = 10) {
  return await request.get("/api/comment", {
    params: { page, limit, blogid },
  });
}
