<template>
  <div class="chat-container" ref="chatContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import { postMessage, getMessages } from "@/api/message";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("chatContainer")],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (!dom || this.isLoading) {
        return;
      }
      const range = 100;
      const des = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (des <= range) {
        this.fetchMore();
      }
    },
    async fetchData() {
      return await getMessages(this.page, this.limit);
    },
    //加载更多
    async fetchMore() {
      //没有可以加载的数据
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      //合并为一个数组
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const resp = await postMessage({
        ...formData,
      });

      this.data.rows.unshift(resp);
      this.data.total++;
      callback("感谢您的留言！"); //告诉子组件处理完成
    },
  },
};
</script>

<style scoped lang="less">
.chat-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px 0;
  box-sizing: border-box;
  position: relative;
  scroll-behavior: smooth;
  .message-area-container {
    width: 700px;
    margin: 0 auto;
  }
}
</style>
