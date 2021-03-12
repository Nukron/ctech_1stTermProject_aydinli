<template>
  <section id="panels" :class="`layout-${layout}`">
    <div v-for="n in panelIndex" :key="n" class="panel">
      <div class="title-bar">
        <div :class="editable ? 'editable' : ''">Panel</div>
        <div class="actions"><font-awesome-icon icon="plus" /></div>
        <div class="actions"><font-awesome-icon icon="angle-left" /></div>
        <div class="actions"><font-awesome-icon icon="angle-left" /></div>
      </div>
    </div>

    <!-- <div v-if="editable" > 
   Test
   </div> -->

    <nav v-if="editable" id="tabs-drawer" class="drawer">
      <div class="actions"><font-awesome-icon icon="th-large" />Tab Layout</div>

      <LayoutConfig @makeActive="makeActive($event)" />

      <div class="button-list">
        <!-- <button tabIndex={-1} className="btn btn-secondary" onClick={this.onChangeIcon}>Change tab icon</button> -->
        <button
          tabIndex="{-1}"
          className="btn btn-secondary"
          onClick="{this.onRenameTabModal}"
        >
          Rename Tab
        </button>
        <!-- <button tabIndex={-1} className="btn btn-secondary" onClick={this.onDuplicateTab}>Duplicate Tab</button> -->
      </div>
    </nav>
  </section>
</template>



<script>
import LayoutConfig from "@/components/LayoutConfig.vue";

export default {
  name: "EventSubPage",
  data() {
    return {
      editable: {
        type: Boolean,
        default: false,
      },

      layout: "1x1",
      panelIndex: 1,
    };
  },

  methods: {
    makeActive(layout) {
      console.log(layout.layout);
      console.log(layout.panelIndex);

      this.layout = layout.layout;
      this.panelIndex = layout.panelIndex;
    },
  },

  components: {
    LayoutConfig,
  },
};
</script>


<style scoped lang="scss">
.panelWrapper {
  width: 200px;
  height: 100px;
}

.btn.btn-secondary {
  border: solid 1px #000;
  background-color: #242730;

  color: #cccbcb;
  transition: all 0.2s ease;

  &:hover {
    background-color: darken(#242730, 2);
    cursor: pointer;
  }
}

#tabs-drawer {
  position: absolute;
  top: 105px;
  height: calc(100% - 50px);
  width: 200px;
  right: -10px;
  transition: right 0.2s ease;
}

.button-list {
  display: flex;
  flex-direction: column;

  .btn {
    margin: 10px;
  }
}

#panels {
  min-height: 50px;
  grid-column-start: 2;
  grid-row-start: 2;

  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  width: calc(100% - 0px);
  height: calc(100% - 50px);

  align-items: center;

  //padding-left: 50px;

  transition: width 0.2s ease;

  &.layout-1x1 {
    grid-template-columns: 100%;
    grid-template-rows: 100%;

    .panel {
      height: 100vh;
    }
  }

  &.layout-1x2 {
    grid-template-columns: 100%;
    grid-template-rows: 50% 50%;

    .panel {
      height: 45vh;
    }
  }

  &.layout-2x1 {
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
    .panel {
      height: 100vh;
    }
  }

  &.layout-2x2 {
    .panel {
      height: 45vh;
    }
  }

  .panel {
    height: 100%;
    width: 100%;
    background-color: #1f1f21;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    //border-radius: $panel-border-radius;
    overflow: hidden;
    font-size: 14px;

    .title-bar {
      background-color: #2d2d30;
      padding: 0px 0px 0px 20px;
      display: flex;
      align-items: center;

      .panel-title {
        height: 34px;
        margin-right: auto;
        display: flex;
        align-items: center;
        //color: $panel-title-color;
      }

      .editable {
        cursor: pointer;
      }

      .actions {
        padding: 5px;
      }

      .edit {
        margin-right: 15px;
      }

      .selected {
      }
    }

    .actions {
      margin: 0px 10px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      cursor: pointer;

      &.disabled {
        color: darken(#cdcccc, 50%);
        cursor: unset;
      }
    }
    .content-wrapper {
      height: calc(100% - 34px);
    }

    .content {
      padding: 10px;
      display: flex;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      justify-content: space-evenly;
      align-items: center;
      flex-direction: row;
    }

    .stack-content {
      overflow-y: auto;
      overflow-x: hidden;
      justify-content: flex-start;
      flex-direction: column;
    }

    .underline {
      height: 1px;
      width: 100%;
      //border-bottom: solid 1px $color-primary-text;
    }
  }
}

.tabs-open {
  #panels {
    width: calc(100% - 200px);
  }
  .actions {
    opacity: 1;
    pointer-events: unset;
  }

  #tabs-drawer {
    right: 0px;
  }
}

nav {
  background-color: #252730;

  &#presets-drawer {
    position: absolute;
    width: 50px;
    height: calc(100% -50px);
    top: 50px;
    left: 0px;
    z-index: 99;
    transition: width 0.2s ease;
  }

  &#tabs-drawer {
    position: absolute;
    top: 100px;
    height: calc(100% - 50px);
    width: 200px;
    right: -200px;
    transition: right 0.2s ease;
  }

  &.drawer {
    min-height: 50px;
    width: 100%;
    grid-row-start: 2;
  }
}

#app.tabsopen {
  #tabs-drawer {
    right: -200px;
  }
}
</style>
