import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "@/utils/showMessage.module.less";
/**
 * 消息框弹出
 * content, type = "info", duration = 2000, container
 * @param {String} content 内容
 * @param {String} type info error success warn
 * @param {Number} duration 持续时间消失
 * @param {HTMLElement} container 容器 ,消息会显示到页面的中央
 */

export default function (options = {}) {
  const content = options.content || "";
  const type = options.type || "info";
  const duration = options.duration || 2000;
  let container = options.container || document.body;
  const div = document.createElement("div");
  const iconDome = getComponentRootDom(Icon, {
    type,
  });
  div.innerHTML = `<span class="${styles.icon}">${iconDome.outerHTML}</span><div>${content}</div>`;
  //添加设置的样式
  div.classList.add(styles.message, styles[`message-${type}`]);

  //容器的position是否被改动
  if (options.container) {
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
  }

  container.appendChild(div);

  //浏览器强行渲染
  div.clientHeight; //导致reflew

  //回归正常位置
  div.style.transform = `translate(-50%,-50%) `;
  div.style.opacity = 1;

  //一段时间消失
  setTimeout(() => {
    div.style.transform = `translate(-50%,-50%) translateY(-25px)`;
    div.style.opacity = 0;
    div.addEventListener(
      "transitionend",
      function () {
        div.remove();
        //有回调函数就执行回调
        options.callback && options.callback();
      },
      { once: true }
    );
  }, duration);
}
