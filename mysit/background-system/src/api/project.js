import request from "@/utils/request";

/**
 * 获取项目列表
 * @returns
 */
export function getProject() {
  return request({ url: "/api/project", method: "get" });
}

/**
 * 添加项目
 * @param {*} projectInfo
 * @returns
 */
export function addProject(data) {
  return request({ url: "/api/project", method: "post", data });
}

/**
 * 通过id删除项目
 * @param {*} id
 * @returns
 */
export function deleteProject(id) {
  return request({ url: `/api/project/${id}`, method: "delete" });
}

/**
 * 修改项目
 * @param {} projectInfo
 * @returns
 */
export function setProject(projectInfo) {
  return request({
    url: `/api/project/${projectInfo.id}`,
    method: "put",
    data: projectInfo.data,
  });
}
