<template>
  <div class="about-container" v-loading="!isLoading || !srcLoading">
    <iframe v-if="data" class="about-context" :src="data" frameborder="0" @load="srcLoading = true"></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      srcLoading: false,
    };
  },
  computed: {
    ...mapState("about", ["isLoading", "data"]),
  },
  created() {
    this.$store.dispatch("about/fetchAbout");
    // this.isLoading = false;
  },
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .about-context {
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box;
    position: relative;
  }
}
</style>
