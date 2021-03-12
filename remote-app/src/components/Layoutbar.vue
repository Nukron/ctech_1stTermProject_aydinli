<template>
  <nav id="tabs-drawer" class="drawer">
    <div class="section-divider">
      <font-awesome-icon icon="th-large" />
      Layout
    </div>
  </nav>
</template>

<script>
export default {
  name: "EventPage",
  data() {
    return {
      items: [],
    };
  },
  components: {},
};
</script>

<style scoped lang="scss">
nav {
  color: $accent-color;
}

#tabs-drawer {
  position: absolute;
  top: 50px;
  height: calc(100% - 50px);
  width: 200px;
  right: -200px;
  transition: right 0.2s ease;
}

.drawer {
  min-height: 50px;
  width: 100%;
  grid-row-start: 2;
}

.nav-wrapper.vertical.editable {
  #tabs-drawer {
    right: 0px;
  }
}
</style>
