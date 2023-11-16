import eventBus from "../eventBus";
import { debounce } from "@/utils";
import defaultImg from "@/assets/loading.gif";
//调用该函数，就可以设置哪些合适的图片
let images = [];

/**
 * 处理单个图片
 * @param {} img
 */
function setImage(img) {
  //真实图片没加载之前的图片
  img.dom.src = defaultImg;
  //处理图片是否在视口内
  const rect = img.dom.getBoundingClientRect();
  const clientHeight = document.documentElement.clientHeight;
  const height = rect.height || 100;
  if (rect.top >= -height || rect.top <= clientHeight) {
    //在视口范围内
    const tempImg = new Image();
    tempImg.onload = function () {
      //当真实图片加载的时候，把真实的dom绑定服务器图片地址
      img.dom.src = img.src;
    };

    tempImg.src = img.src;
    //将加载好的图片移出数组
    images = images.filter((item) => item !== img);
  }
}

function setImages() {
  for (const image of images) {
    //处理图片
    setImage(image);
  }
}
function handleScroll() {
  setImages();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

export default {
  inserted(el, bindings) {
    images.push({
      dom: el,
      src: bindings.value,
    });
    setImages();
  },
  unbind(el) {
    images = images.filter((item) => item.dom !== el);
  },
};
