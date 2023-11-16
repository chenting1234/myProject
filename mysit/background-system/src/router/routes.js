/* Layout */
import Layout from "@/layout";
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export default [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "控制台", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/banner",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Banner",
        component: () => import("@/views/banner"),
        meta: { title: "首页标语", icon: "el-icon-s-home" },
      },
    ],
  },

  {
    path: "/blog",
    component: Layout,
    redirect: "/blog",
    name: "Blog",
    meta: { title: "文章管理", icon: "el-icon-document" },
    children: [
      {
        path: "blogList",
        name: "BlogList",
        component: () => import("@/views/blog/blogList"),
        meta: { title: "文章列表", icon: "el-icon-tickets" },
      },
      {
        path: "blogType",
        name: "BlogType",
        component: () => import("@/views/blog/blogType"),
        meta: { title: "文章分类", icon: "el-icon-menu" },
      },
      {
        path: "addBlog",
        name: "AddBlog",
        component: () => import("@/views/blog/addBlog"),
        meta: { title: "添加文章", icon: "el-icon-document-add" },
      },
      {
        path: "aditBlog/:id",
        name: "AditBlog",
        component: () => import("@/views/blog/editBlog"),
        hidden: true,
        meta: { title: "编辑文章", icon: "el-icon-document-add" },
      },
    ],
  },

  {
    path: "/project",
    component: Layout,
    redirect: "/project",
    name: "Project",
    meta: { title: "项目管理", icon: "el-icon-suitcase" },
    children: [
      {
        path: "projectList",
        name: "ProjectList",
        component: () => import("@/views/project/projectList"),
        meta: { title: "项目列表", icon: "el-icon-notebook-2" },
      },
      {
        path: "addProject",
        name: "addProject",
        component: () => import("@/views/project/addProject"),
        meta: { title: "添加项目", icon: "el-icon-circle-plus-outline" },
      },
    ],
  },

  {
    path: "/chat",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Chat",
        component: () => import("@/views/chat"),
        meta: { title: "评论管理", icon: "el-icon-chat-line-round" },
      },
    ],
  },

  {
    path: "/message",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Message",
        component: () => import("@/views/message"),
        meta: { title: "留言板", icon: "el-icon-copy-document" },
      },
    ],
  },

  {
    path: "/about",
    component: Layout,
    children: [
      {
        path: "index",
        name: "About",
        component: () => import("@/views/about"),
        meta: { title: "关于我", icon: "el-icon-s-custom" },
      },
    ],
  },

  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Setting",
        component: () => import("@/views/setting"),
        meta: { title: "设置", icon: "el-icon-s-tools" },
      },
    ],
  },
  {
    path: "/personalSetting",
    component: Layout,
    hidden: true,
    meta: { children: ["/personalSetting"] },
    children: [
      {
        path: "/personalSetting",
        name: "PersonalSetting",
        component: () => import("@/views/personalSetting/index"),
        meta: { title: "个人中心", icon: "el-icon-document-copy", auth: true },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];
