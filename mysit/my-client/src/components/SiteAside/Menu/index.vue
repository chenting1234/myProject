<template>
  <ul class="menu-container">
    <li>
      <RouterLink
        :to="{ name: item.name }"
        v-for="item in items"
        :key="item.link"
        :exact="item.exact"
      >
        <div class="icon">
          <Icon :type="item.icon" />
        </div>
        <span>{{ item.title }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          icon: "home",
          title: "首页",
          name: "Home",
          exact: true,
        },
        {
          icon: "blog",
          title: "文章",
          name: "Blog",
          exact: false, //只要当前路径以link开头
        },
        {
          icon: "about",
          title: "关于我",
          name: "About",
          exact: true,
        },
        {
          icon: "code",
          title: "项目&效果",
          name: "Project",
          exact: true,
        },
        {
          icon: "chat",
          title: "留言板",
          name: "Message",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/style/var.less";
.menu-container {
  margin: 24px 0;
  width: 100%;
  a {
    color: @gray;
    display: block;
    padding: 0 50px;
    display: flex;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
    &.router-link-active {
      background: #2d2d2d;
    }
  }
}
</style>
