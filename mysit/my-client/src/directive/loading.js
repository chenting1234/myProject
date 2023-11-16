import styles from "@/directive/loading.module.less";
import loadingUrl from "@/assets/loading.svg";
//判断是否有img元素
function getLoadingImg(el) {
  return el.querySelector("img[data-role=loading]");
}

function createLoadingImg(el) {
  const img = document.createElement("img");
  img.dataset.role = "loading";
  img.src = loadingUrl;
  img.classList.add(styles.loading);
  el.appendChild(img);
}
export default function (el, bingding) {
  // 该函数会被同时设置到bind和update中
  //根据value值，决定是否创造或者删除img元素
  const loadingImg = getLoadingImg(el);
  if (bingding.value) {
    //加载状态，创造img元素
    if (!loadingImg) {
      createLoadingImg(el);
    }
  } else {
    if (loadingImg) {
      loadingImg.remove();
    }
  }
}
