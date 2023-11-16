<template>
  <div class="test-container">
    <HierarchicalList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import HierarchicalList from "./HierarchicalList.vue";
export default {
  components: {
    HierarchicalList,
  },
  data() {
    return {
      list: [
        { name: "a", isSelect: false },
        {
          name: "b",
          isSelect: true,
          children: [
            { name: "b-1", isSelect: false },
            { name: "b-2", isSelect: false },
            { name: "b-3", isSelect: true },
            { name: "b-4", isSelect: false },
          ],
        },
        { name: "c", isSelect: false },
        { name: "d", isSelect: false },
        { name: "e", isSelect: false },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style></style>
