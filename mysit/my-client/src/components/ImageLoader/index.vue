<template>
  <div class="image-loader-container">
    <img v-if="!everyThingDone" class="placeholder" :src="placeholder" alt="" />
    <img
      :src="src"
      alt=""
      @load="handleLoad"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    //图片路径
    src: {
      type: String,
      required: true,
    },
    //原始图片加载成前的占位图片
    placeholder: {
      type: String,
      required: true,
    },
    //原始图片加载完成后，切换到冤死图经过的秒数
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      originLoaded: false, //原图是否加载完成
      everyThingDone: false, //什么事情都做完了
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everyThingDone = true;
        //通知父组件原图加载完成
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  // opacity: 0;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>
