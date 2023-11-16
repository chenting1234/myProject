<template>
  <div class="site-aside-container">
    <Avatar :url="data.avatar" />
    <h1>{{ data.siteTitle }}</h1>
    <Menu />
    <Contact />
    <p class="footer">{{ data.icp }}</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Contact from "./Contact";
import Menu from "./Menu";
import { mapState } from "vuex";

export default {
  components: {
    Contact,
    Menu,
    Avatar,
  },
  computed: {
    ...mapState("setting", ["isLoading", "data"]),
  },
  created() {
    this.$store.dispatch("setting/fetchSettings");
  },
};
</script>

<style scoped lang="less">
@import "~@/style/var.less";

.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  overflow-x: hidden;
  overflow-y: auto;

  h1 {
    text-align: center;
    font-size: 1em;
    color: @lightWords;
  }

  .avatar-container {
    margin: 0 auto;
  }

  .footer {
    text-align: center;
    font-size: 12px;
  }
}
</style>
