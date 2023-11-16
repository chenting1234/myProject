<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
import "@/style/global.less";
export default {
  components: {
    Contact,
  },
};
</script>

<style scoped lang="less">
.test-container {
  width: 200px;
  height: 500px;
  border: 2px solid #ccc;
  background: #000;
}
</style>
