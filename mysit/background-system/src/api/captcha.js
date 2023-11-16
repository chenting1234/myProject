//向服务器发请求获取验证码信息
import request from "@/utils/request";

export function getCaptcha() {
  return request({
    url: "/res/captcha",
    method: "get",
  });
}
