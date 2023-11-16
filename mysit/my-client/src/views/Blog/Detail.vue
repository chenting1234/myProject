<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="!isLoading" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <BlogTOC :toc="data.toc" />
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "@/views/Blog/components/BlogDetail";
import BlogTOC from "@/views/Blog/components/BlogTOC";
import BlogComment from "@/views/Blog/components/BlogComment";
import mainScroll from "@/mixins/mainScroll.js";
import { titleController } from "@/utils";
export default {
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  mixins: [fetchData({}), mainScroll("mainContainer")],
  computed: {
    Id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async fetchData() {
      const resp = await getBlog(this.Id);
      if (!resp) {
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 20px;
  scroll-behavior: smooth;
  position: relative;
}
</style>
