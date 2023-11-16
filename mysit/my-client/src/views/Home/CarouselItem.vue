<template>
  <div class="carousel-item-container">
    <div class="carousel-img">
      <ImageLoader
        :placeholder="carousel.midImg"
        :src="carousel.bigImg"
        @load="this.showWords"
      />
    </div>
    <div class="title" ref="title">
      {{ carousel.title }}
    </div>
    <div class="description" ref="des">
      {{ carousel.description }}
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  data() {
    return {
      titleWidth: 0,
      desWidth: 0,
    };
  },
  components: {
    ImageLoader,
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.desWidth = this.$refs.des.clientWidth;
    this.showWords();
  },
  methods: {
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;

      //强制浏览器重新渲染
      this.$refs.title.clientWidth;

      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      //描述
      this.$refs.des.style.opacity = 1;
      this.$refs.des.style.width = 0;

      //强行浏览器渲染
      this.$refs.des.clientHeight;
      this.$refs.des.style.transition = "2s";
      this.$refs.des.style.width = this.desWidth + "px";
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/style/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  position: relative;
  .carousel-img {
    width: 100%;
    height: 100%;
  }
  .title,
  .description {
    position: absolute;
    left: 30px;
    color: #fff;
    letter-spacing: 3px;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }
  .description {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>
