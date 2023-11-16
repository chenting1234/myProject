<template>
  <div class="container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>

      <template>
        <RouterView></RouterView>
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
import ToTop from "@/components/ToTop";
export default {
  components: {
    Layout,
    SiteAside,
    ToTop,
  },
};
</script>

<style scoped lang="less">
@import "~@/style/mixin.less";
.container {
  .self-fill(fixed);

  .aside {
    width: 250px;
    height: 100%;
  }
}
</style>
