import axios from "axios";
import showMessage from "@/utils/showMessage";

const instance = axios.create({
  // baseURL: "/api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
}); //创建一个axios的实例
//响应拦截器
instance.interceptors.response.use(function (resp) {
  if (resp.data.code !== 0) {
    showMessage({
      content: resp.data.msg,
      type: "error",
      duration: 1500,
    });
    return null;
  }
  return resp.data.data;
});

export default instance;
