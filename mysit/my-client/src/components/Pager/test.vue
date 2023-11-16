<template>
  <div>
    <Pager :total="total" :current="current" @pageChange="handleChange" />
  </div>
</template>

<script>
import Pager from "./";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      current: 1,
      total: 100,
    };
  },

  methods: {
    handleChange(page) {
      this.current = page;
    },
  },
};
</script>

<style></style>
