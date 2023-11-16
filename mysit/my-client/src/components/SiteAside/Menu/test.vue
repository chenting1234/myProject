<template>
  <div class="test-container">
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "./";
import "@/style/global.less";
export default {
  components: {
    Menu,
  },
};
</script>

<style scoped lang="less">
.test-container {
  width: 400px;
  height: 500px;
  border: 2px solid #ccc;
  background: #000;
}
</style>
