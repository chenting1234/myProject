<template>
  <ul class="hierarchical-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelect }">{{
        item.name
      }}</span>
      <span
        v-if="item.aside"
        class="aside"
        :class="{ active: item.isSelect }"
        @click="handleClick(item)"
        >{{ item.aside }}</span
      >
      <!-- 显示当前的组件 -->
      <HierarchicalList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "HierarchicalList",
  //[{name: "xxx",isSelect:true,children:[{name:"yyy"},isSelect:true]}]
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      //扔给父组件处理
      if (!item.isSelect) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/style/var.less";
.hierarchical-list-container {
  list-style: none;
  padding: 0;
  overflow-y: auto;
  .hierarchical-list-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    .active {
      color: @warn;
    }
  }
  .aside {
    font-size: 12px;
    margin-left: 1em;
    color: @lightWords;
  }
}
</style>
