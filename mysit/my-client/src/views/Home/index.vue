<template>
  <div
    class="home-container"
    ref="container"
    @wheel="handleWhell"
    v-loading="isLoading"
  >
    <ul
      class="csrousel-item"
      :style="{ marginTop: marginTop }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <CsrouselItem :carousel="item" />
      </li>
    </ul>

    <div v-show="index > 0" class="icon icon-up" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>

    <div
      v-show="index < data.length - 1"
      class="icon icon-down"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>

    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{ active: index === i }"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<script>
import CsrouselItem from "@/views/Home/CarouselItem.vue";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    CsrouselItem,
    Icon,
  },
  data() {
    return {
      index: 0, //当前显示第几张轮播图
      containerHight: 0, //整个容器高度
      isWhell: false, //是否正在切换中
    };
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHight + "px";
    },
    ...mapState("banner", ["isLoading", "data"]),
  },
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    //切换到第几个轮播图
    switchTo(i) {
      this.index = i;
    },
    handleWhell(e) {
      //console.log(e);
      //正在滚动的时候，不让滚动
      if (this.isWhell) {
        return;
      }
      if (e.deltaY > 5 && this.index < this.data.length - 1) {
        //向下滚动
        this.isWhell = true;
        this.index++;
      } else if (e.deltaY < 5 && this.index > 0) {
        //向上滚动
        this.isWhell = true;
        this.index--;
      }
    },
    handleTransitionEnd() {
      this.isWhell = false;
    },
    handleResize() {
      this.containerHight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
@gap: 25px;
.home-container {
  width: 100%;
  height: 100%;
  ul {
    margin: 0;
  }
  .csrousel-item {
    width: 100%;
    height: 100%;
    transition: 500ms;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    margin: 0;
    position: fixed;
    left: 50%;
    font-size: 30px;
    color: @gray;
    cursor: pointer;
    transition: 0.3s;
  }
  .icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  .icon-down {
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translateY(@jump);
    }
    50% {
      transform: translateY(-@jump);
    }
    100% {
      transform: translateY(@jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translateY(-@jump);
    }
    50% {
      transform: translateY(@jump);
    }
    100% {
      transform: translateY(-@jump);
    }
  }

  .indicator {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    li {
      width: 7px;
      height: 7px;
      border: 1px solid #fff;
      background: @words;
      margin-bottom: 10px;
      border-radius: 50%;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>
