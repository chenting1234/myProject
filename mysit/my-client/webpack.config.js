const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

if (process.env.NODE_ENV === "production") {
  module.exports = {
    plugins: [new BundleAnalyzerPlugin()],
    //使用CDN,
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
    },
  };
} else {
  module.exports = {};
}