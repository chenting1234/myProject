<template>
  <Layout>
    <template>
      <BlogList />
    </template>
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogCategory from "@/views/Blog/components/BlogCategory.vue";
import BlogList from "@/views/Blog/components/BlogList.vue";
export default {
  components: {
    Layout,
    BlogCategory,
    BlogList,
  },
};
</script>

<style></style>
