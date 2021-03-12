<template>
  <section id="panels">
    <div class="panel">
      <div class="title-bar">
        <div class="panelName"></div>
        <div class="actions">
          <font-awesome-icon icon="plus" />
        </div>
        <div class="actions">
          <font-awesome-icon icon="copy" />
        </div>
        <div class="actions">
          <font-awesome-icon icon="paste" />
        </div>
        <div class="actions">
          <font-awesome-icon icon="layer-group" />
        </div>
      </div>
      <div class="widget" />
    </div>
  </section>
</template>
<script>
export default {
  name: "TabSubpage",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
#panels {
  min-height: 50px;
  grid-column-start: 2;
  grid-row-start: 2;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;

  align-items: center;

  transition: width 0.2s ease;
}
</style>
