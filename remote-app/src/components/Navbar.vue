<template>
  <div class="nav-wrapper" :class="{ vertical: vertical }">
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
            <i> <font-awesome-icon v-if="showIcons" :icon="item.iconName" /></i>
            <p v-if="showText">{{ item.name }}</p>
          </a>
        </div>
      </div>
    </nav>
    <div class="content">
      <component v-bind:is="active ? active.component : null"></component>
    </div>
  </div>
</template>

<script>
import cache from "@/cache.js";

export default {
  name: "Navbar",
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
    showIcons: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    makeActive(page) {
      // cache[this.computeBasePath() + this.$options.name] = page.name;
      // UnrealService.abortRequests();
      this.active = page;
      // console.log(this.$options,name);
    },
  },
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
.nav-wrapper {
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
  padding-left: 10px;
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
  justify-content: space-between;
}
.nav-items a {
  display: inline-flex;
  align-items: center;
  padding: 7px 7px;
  height: 100%;
  padding-left: 15px;
  padding-right: 25px;
  font-size: 19px;
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
  background-color: #424040;
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
.nav-wrapper.vertical {
  flex-direction: row;
  nav {
    min-height: 100vh;
    width: min-content;
    flex-direction: column;
    padding-left: 0px;
  }

  .nav-items {
    display: flex;
    flex-direction: column;
  }

  .nav-items a {
    display: flex;
    height: min-content;
    justify-content: center;
    border-left: 7px solid transparent;
    border-bottom: 1px solid #222;
    border-top: 1px solid #444;
    background: #303030;

    &:nth-child(odd) {
      background: #333333;
    }

    i {
      font-size: x-large;
    }
  }

  .nav-items a:hover {
    background: #535353;
  }

  .nav-items .active {
    border-left: 7px solid $primary-color;
  }
  .content {
    width: 100%;
  }
  .generated {
    height: initial;
    display: initial;
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
    border: solid 1px darken(#242731, $amount: 2);
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
    background-color: #242731;
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
}
</style>
