module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/variables.scss";
          `
      }
    }
  },
  devServer: {
    port: 7000
  }
}
