import request from "@/utils/request";

/**
 * 获取博客文章
 * @param {*} page
 * @param {*} limit
 * @param {*} keyword
 * @param {*} categoryId
 * @returns
 */
export function getBlogList(page = 1, limit = 10, keyword, categoryId) {
  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

/**
 * 删除博客
 * @param {*} id
 * @returns
 */
export function deleteBlog(id) {
  return request({ url: `/api/blog/${id}`, method: "delete" });
}

/**
 * 获取博客分类
 * @param {*} id
 * @returns
 */
export function getBlogType() {
  return request({ url: "/api/blogtype", method: "get" });
}

/**
 * 根据id获取博客分类
 * @param {*} id
 * @returns
 */
export function findOneBlogType(id) {
  return request({ url: `/api/blogtype/${id}`, method: "get" });
}
/**
 * 添加博客分类
 * @param {*} data
 * @returns
 */
export function addBlogType(data) {
  return request({ url: "/api/blogtype", method: "post", data });
}

/**
 * 修改博客分类
 * @param {*} id
 * @returns
 */
export function editeBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: "put",
    data: editInfo.data,
  });
}

/**
 * 删除博客分类
 * @param {*} id
 * @returns
 */
export function deleteBlogType(id) {
  return request({ url: `/api/blogtype/${id}`, method: "delete" });
}

/**
 * 发布文章
 * @param {*} data
 * @returns
 */
export function setBlog(data) {
  return request({ url: "/api/blog", method: "post", data });
}

/**
 * 修改文章
 * @param {*} blogInfo
 * @returns
 */
export function editBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: "put",
    data: blogInfo,
  });
}

/**
 * 根据id获取单篇文章
 * @param {*} id
 * @returns
 */
export function getByIdBlog(id) {
  return request({ url: `/api/blog/${id}`, method: "get" });
}
