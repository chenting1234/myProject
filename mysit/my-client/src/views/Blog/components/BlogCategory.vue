<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章列表</h2>
    <HierarchicalList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import HierarchicalList from "@/views/Blog/components/HierarchicalList";
import fetchData from "@/mixins/fetchData";
import { getBlogtype } from "@/api/blog";
export default {
  mixins: [fetchData([])],
  components: {
    HierarchicalList,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    list() {
      // const totalarticleCount = this.data.map((item) => item.article);
      //更改数组，添加数组第一项为[全部]
      const totalarticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        { name: "全部", id: -1, articleCount: totalarticleCount },
        ...this.data,
      ];
      return result.map((item) => {
        return {
          ...item,
          isSelect: item.id === this.categoryId,
          aside: `${item.articleCount}篇`,
        };
      });
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
  },
  methods: {
    async fetchData() {
      return await getBlogtype();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      //进行路由跳转
      if (item.id === -1) {
        ///article?page = 1&limit=10
        this.$router.push({
          // 命名路由跳转
          name: "Blog",
          query,
        });
      } else {
        ///article/cate/:8?page = 1&limit=10
        this.$router.push({
          name: "BlogCategory",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 14px;
  position: relative;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
