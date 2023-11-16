<template>
  <div class="blog-TOC-container">
    <h2>文章列表</h2>
    <HierarchicalList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import HierarchicalList from "@/views/Blog/components/HierarchicalList";
import { debounce } from "@/utils";
export default {
  components: {
    HierarchicalList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      active: "",
    };
  },
  computed: {
    tocWithSelect() {
      const getToc = (toc = []) => {
        return toc.map((item) => ({
          ...item,
          isSelect: item.anchor === this.active,
          children: getToc(item.children),
        }));
      };
      return getToc(this.toc);
    },
    //根据toc得到doms数组
    doms() {
      const doms = [];
      const addToDom = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDom(t.children);
          }
        }
      };
      addToDom(this.toc);
      return doms;
    },
  },
  created() {
    this.$bus.$on("mainScroll", debounce(this.setActive, 50));
  },
  //组件销毁时，不再监听事件总监
  destroyed() {
    this.$bus.$off("mainScroll", debounce(this.setActive, 50));
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    //设置active的激活状态
    setActive(scrollDom) {
      if (!scrollDom) {
        return;
      }
      this.active = ""; //初始化激活状态，不激活
      const range = 200;
      for (const dom of this.doms) {
        //没有dom元素，进行下次循环
        if (!dom) {
          continue;
        }
        //有dom元素
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top < range) {
          //正常范围，active被选中
          this.active = dom.id;
        } else if (top > range) {
          //在规定范围的下方
          return;
        } else {
          //规定范围的上方
          this.active = dom.id;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-TOC-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 14px;

  position: relative;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
