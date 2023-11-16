<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{
            name: 'BlogDetail',
            params: {
              id: item.id,
            },
          }">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{
            name: 'BlogDetail',
            params: {
              id: item.id,
            },
          }">
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(+item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span><a href="">评论{{ item.commentNumber }}</a></span>
            <RouterLink :to="{
              name: 'BlogCategory',
              params: {
                categoryId: item.category.id,
              },
            }">{{ item.category.name }}</RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页 -->
    <Pager :total="data.total" @pageChange="handleChange" :limit="roteInfo.limit" :current="roteInfo.page" />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import { getBlogs } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
import formatDate from "@/utils/formatDate";
import mainScroll from "@/mixins/mainScroll.js";
import Empty from "@/components/Empty";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("container")],
  components: {
    Pager,
    Empty,
  },
  watch: {
    // 观察 this.$route 的变化，变化后，会调用该函数
    async $route() {
      // newVal：this.$route 新的值，等同 this.$route
      // oldVal：this.$route 旧的值
      this.isLoading = true;
      //滚动高度变为0
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
  computed: {
    //从地址栏拿到数据,点击文章进入文章首页的时候拿到的是初始数据
    roteInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const limit = +this.$route.query.limit || 10;
      const page = +this.$route.query.page || 1;
      return {
        categoryId,
        limit,
        page,
      };
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlogs({
        page: this.roteInfo.page,
        limit: this.roteInfo.limit,
        categoryid: this.roteInfo.categoryId,
      });
    },
    //改变页码数的时候，更改地址栏
    handleChange(page) {
      const query = {
        page,
        limit: this.roteInfo.limit,
      };
      //进行路由跳转
      if (this.roteInfo.categoryId === -1) {
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
            categoryId: this.roteInfo.categoryId,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/style/var.less";

.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;

  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;

    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }

  .main {
    flex: 1 1 auto;

    h2 {
      margin: 0;
    }
  }

  .aside {
    font-size: 12px;
    color: @gray;

    span {
      margin-right: 15px;
    }
  }

  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
