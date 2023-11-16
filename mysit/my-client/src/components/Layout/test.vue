<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="left">左边区域，宽度适应类容，溢出隐藏</div>
      </template>

      <template>
        <div class="main">中间区域，宽度适应类容，溢出隐藏</div>
      </template>

      <template #right>
        <div class="right">
        </div>
      </template>
    </Layout>
  </div>





  <script>
    import Layout from "./";
    export default {
      components: {
        Layout,
      },
    };
  </script>

  <style scoped lang="less">
    .test-container {
      width: 60%;
      height: 600px;
      border: 2px solid;
      margin: 0 auto;

      .left {
        width: 200px;
        height: 100%;
        background: lightcoral;
      }

      .main {
        width: 100%;
        height: 100%;
        background: lightgreen;
      }

      .right {
        width: 150px;
        height: 100%;
        background: lightblue;
      }
    }
  </style>
