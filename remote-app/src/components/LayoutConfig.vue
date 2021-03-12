<template>
  <div class="layout-icons">
    <div
      v-for="item in PanelsLayout"
      :key="item.layout"
      v-on:click="() => makeActive(item)"
      :class="[
        active === item ? 'active' : '',
        selected === item ? 'selected' : '',
      ]"
      class="layout-icon layout-p"
    >
      {{ item.layout }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutConfig",
  data() {
    return {
      PanelsLayout: [
        { layout: "1x1", count: 1 },
        { layout: "1x2", count: 2 },
        { layout: "2x1", count: 2 },
        { layout: "2x2", count: 4 },
      ],
    };
  },

  methods: {
    makeActive(item) {
      // cache[this.computeBasePath() + this.$options.name] = page.name;
      // UnrealService.abortRequests();
      this.active = item.layout;
      this.selected = item.layoutlayout;
      console.log(item.count);
      this.$emit("makeActive", { layout: item.layout, panelIndex: item.count });

      // console.log(this.$options,name);
    },
  },

  components: {},
};
</script>

<style scoped lang="scss">
.layout-icons {
  display: flex;
  margin-left: calc(50% - 75px);
  margin-bottom: 20px;
  flex-wrap: wrap;

  .layout-icon {
    width: 72px;
    height: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    flex-wrap: wrap;
    border: solid 2px transparent;

    &.obo {
      // 1x1
      .layout-p {
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        display: none;
      }
    }
    &.obt {
      // 1x2
      flex-direction: column;
      .layout-p {
        width: calc(100% - 10px);
        height: 25px;
      }
    }
    &.tbo {
      .layout-p {
        width: 25px;
        height: calc(100% - 10px);
      }
    }
    &.tbt {
      // 2x2
    }

    &.active {
      background: #353944;
    }
    &.selected {
      border: solid 2px transparent;

      .layout-p {
        background-color: #be7c64;
      }
    }

    &:hover {
      background: #353944;
      cursor: pointer;
    }

    .layout-p {
      background-color: darken(#cdcccc, 5);
      border-radius: 4px;
      height: 25px;
      width: 25px;
      margin: 3px;
    }
  }
}
</style>