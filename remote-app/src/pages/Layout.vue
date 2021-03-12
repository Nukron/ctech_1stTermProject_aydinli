<template>
  <Tabbar
    :items="tabitems"
    :eventbar="true"
    :editable="editable"
    @addTab="addTab(tabitems)"
    @edit="edit()"
  >
    >
  </Tabbar>
  <!-- <div v-if="editable" > 
   Test
   </div> -->
</template>



<script>
import Tabbar from "@/components/Tabbar.vue";
import Layoutbar from "@/components/Layoutbar.vue";
import EventSubPage from "@/pages/EventSubPage.vue";
import Settings from "@/pages/Settings.vue";

export default {
  name: "Layout",
  data() {
    return {
      editable: {
        type: Boolean,
        default: false,
      },

      tabitems: [],

      items: [],
    };
  },

  methods: {
    addTab(tabitems) {
      tabitems.push({
        name: "Tab" + " " + (tabitems.length + 1),
        component: EventSubPage,
      });
    },

    edit() {
      if (this.editable) {
        this.editable = false;
      } else {
        this.editable = true;
      }
    },
  },

  components: {
    Tabbar,
    EventSubPage,
    Settings,
  },
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
