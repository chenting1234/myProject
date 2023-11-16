//网站标题控制
let routerTitle = "";
let siteTitle = "";

function setTitle() {
  if (!routerTitle && !routerTitle) {
    document.title = "Loading...";
  } else if (routerTitle && !siteTitle) {
    document.title = routerTitle;
  } else if (!routerTitle && siteTitle) {
    document.title = siteTitle;
  } else {
    document.title = `${routerTitle}-${siteTitle}`;
  }
}

export default {
  //设置路由标题
  setRouteTitle(title) {
    routerTitle = title;
    setTitle();
  },
  //设置网站标题
  setSiteTitle(title) {
    siteTitle = title;
    setTitle();
  },
};
