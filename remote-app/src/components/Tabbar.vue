<template>
  <div
    class="tab-wrapper"
    :class="[{ vertical: vertical }, editable ? '' : 'tabs-open']"
  >
    <nav>
      <div class="nav-items">
        <div
          c-onlick:="() => makeActive(items[0])"
          class="header-wrapper"
          v-if="!vertical"
        >
          <slot name="header"></slot>
        </div>

        <div class="generated">
          <a
            href="#"
            v-for="item in items"
            :key="item.name"
            v-on:click="() => makeActive(item)"
            :class="active === item ? 'active' : ''"
          >
            <p v-if="showText">{{ item.name }}</p>
          </a>
        </div>

        <div v-if="eventbar" v-on:click="() => addTab(items)">
          <font-awesome-icon class="plus" icon="plus" />
        </div>
      </div>
      <div v-if="eventbar" class="tab edit-tab mode-toggle">
        <label class="switch toggle-mode">
          <input type="checkbox" v-on:change="() => edit()" />
          <span class="slider inline"></span>
        </label>
      </div>

      <!-- <div v-if="editable" class='arrow'><font-awesome-icon icon='angle-left' /></div>
     <div v-if="editable" class='arrow'><font-awesome-icon icon='angle-right' /></div>
     <font-awesome-icon v-if="editable" icon="cog" />
     <font-awesome-icon v-if="editable" icon="redo-alt" /> -->
    </nav>
    <div class="content">
      <component v-bind:is="active ? active.component : null"></component>
    </div>
  </div>
</template>

<script>
import cache from "@/cache.js";
import UnrealService from "@/UnrealService.js";

export default {
  name: "Tabbar2",
  props: {
    items: Array,

    vertical: {
      type: Boolean,
      default: false,
    },
    showText: {
      type: Boolean,
      default: true,
    },

    editable: {
      type: Boolean,
      default: false,
    },

    eventbar: {},

    switchable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    makeActive(page) {
      // cache[this.computeBasePath() + this.$options.name] = page.name;
      // UnrealService.abortRequests();
      this.active = page;
      this.$emit("makeActive", page);
      //  UnrealService.callFunction("/Game/UEDPIE_0_TestMap.TestMap:PersistentLevel.BP_CamManager_Niklas_8", "SetViewPort", {
      //       "ActiveCamera": this.items[this.items.indexOf(page)].tabPath
      //   }, 0, /*sync=*/true);
    },

    addTab(items) {
      this.$emit("addTab", items);
    },

    edit() {
      this.$emit("edit");
    },
  },

  // console.log(this.$options,name);

  data() {
    return {
      active: this.items
        ? this.items.find(
            (item) =>
              item.name === cache[this.computeBasePath() + this.$options.name]
          ) || this.items[0]
        : null,
    };
  },
  computed: {
    showHeader() {
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
.plus {
  margin-left: 20px;
}

.tab-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header-wrapper {
  flex-shrink: 0 !important;

  p {
    display: none;
  }
}
.header-wrapper:hover {
  cursor: pointer;
}
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
a,
a:visited {
  outline: none;
  color: $accent-color;
}
a:hover {
  text-decoration: none;
  background: #535353;
}
a {
  text-decoration: none !important;
}
nav {
  display: flex;
  background-color: #303030;
  //padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  flex-shrink: 0;
  color: $accent-color;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}

.nav-items {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
}
.nav-items a {
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: 225px;
  padding-left: 15px;
  padding-right: 25px;
  font-size: 19px;
}

a {
  &.active:before {
    content: "";
    top: calc(50% - 3px);
    right: 15px;
    display: block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: lime;
    border: 2px solid green;
  }
  &:before {
    content: "";
    top: calc(50% - 3px);
    right: 15px;
    display: block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: lime;
    border: 2px solid green;
    background: firebrick;
    border-color: darkred;
  }
}

.nav-items a:last-child {
  padding-right: 30px;
}
.nav-items a p {
  display: none;
}
.generated {
  height: 100%;
  display: flex;
  align-items: center;
}
a i {
  font-size: x-large;
  padding: 5px;
}
.active {
  background-color: #423e3e;
}
@media only screen and (min-width: 750px) {
  .header-wrapper {
    p {
      display: initial;
    }
  }
  p {
    display: initial;
  }
  .nav-items a {
    padding-left: 15px;
    padding-right: 25px;
  }
}
@media only screen and (min-width: 1100px) {
  .nav-items a p {
    display: initial;
    white-space: nowrap;
    margin-left: 5px;
  }
}
// Handle vertical scrollbar
.tab-wrapper.vertical {
  flex-direction: row;
  nav {
    height: 100%;
    width: 12.5%;
    flex-direction: column;
    padding-left: 0px;
  }
  .nav-items {
    display: flex;
    flex-direction: column;
  }

  .nav-items a {
    display: flex;
    height: 100%;
    justify-content: center;
    border-left: 7px solid transparent;
    border-bottom: 1px solid #222;
    border-top: 1px solid #444;
    background: #303030;

    &:nth-child(odd) {
      background: #333333;
    }

    a:hover {
      text-decoration: none;
      background: #535353;
    }

    i {
      font-size: x-large;
    }
  }
  .nav-items .active {
    border-left: 7px solid $primary-color;
  }
  .content {
    width: 100%;
    height: 100%;
  }
  .generated {
    height: initial;
    display: initial;
    width: 100%;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  &.toggle-mode {
    width: 100px;

    &:before {
      content: "Play";
      position: absolute;
      left: 10px;
      z-index: 1;
      top: 8px;
      cursor: pointer;
    }

    &:after {
      content: "Edit";
      position: absolute;
      right: 10px;
      z-index: 1;
      top: 8px;
      cursor: pointer;
    }
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $background-color;
    //border: solid 1px darken(#242731, $amount: 2);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 3px;
    background-color: #5d5d5d;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    background-color: #fff;
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .slider.inline {
    background-color: #303030;
    &:before {
      height: 4px;
      width: 40px;
      background-color: $primary-color;
    }
  }

  input:checked + .slider.inline:before {
    transform: translateX(55px);
    background-color: $primary-color;
  }

  .arrow {
    width: 55px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
