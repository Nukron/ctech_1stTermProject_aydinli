<template>
  <section id="panels" :class="`layout-1x1`">
    <div class="panel">
      <div class="title-bar">
        <div>Panel</div>
      </div>
      <div class="transformation">
        <p>Transformation</p>
        x:
        <CustomInput :value="-220" @input="setx($event)" />
        y:
        <CustomInput :value="-60" @input="sety($event)" />
        z:
        <CustomInput :value="80" @input="setz($event)" />
      </div>

      <div class="Focal Length">
        <p>Focal Length</p>
        <CustomInput :value="0" @input="setFocal($event)" />
      </div>

      <div class="Focus">
        <p>Focus</p>
        <CustomInput :value="Focus" @input="setFocus($event)" />
      </div>

      <div class="button">
        <button id="printer" v-on:click="print()">Print</button>
      </div>
    </div>
  </section>
</template>

<script>
import CustomInput from "@/components/CustomInput";
import Checkbox from "@/components/Checkbox";
import UnrealService from "@/UnrealService.js";

export default {
  name: "Events",
  data() {
    return {
      x: -220,
      y: -60,
      z: 80,
      Focus: 0,
      Focal: 0,
    };
  },

  components: {
    CustomInput,
    Checkbox,
  },

  methods: {
    print() {
      UnrealService.callFunction(
        "/Game/UEDPIE_0_Main.Main:PersistentLevel.Printer_2",
        "Print",
        {},
        0,
        /* sync= */ true
      );
    },

    updatePlane() {},
    setx(value) {
      this.x = value;
      UnrealService.callFunction(
        "/Game/UEDPIE_0_Main.Main:PersistentLevel.CineCameraActor_1.SceneComponent",
        "SetRelativeLocation",
        {
          NewLocation: {
            X: parseInt(this.x),
            Y: parseInt(this.y),
            Z: parseInt(this.z),
          },
        }
      );
    },

    sety(value) {
      console.log(value);
      this.y = value;
      UnrealService.callFunction(
        "/Game/UEDPIE_0_Main.Main:PersistentLevel.CineCameraActor_1.SceneComponent",
        "SetRelativeLocation",
        {
          NewLocation: {
            X: parseInt(this.x),
            Y: parseInt(this.y),
            Z: parseInt(this.z),
          },
        }
      );
    },

    setz(value) {
      this.z = value;
      UnrealService.callFunction(
        "/Game/UEDPIE_0_Main.Main:PersistentLevel.CineCameraActor_1.SceneComponent",
        "SetRelativeLocation",
        {
          NewLocation: {
            X: parseInt(this.x),
            Y: parseInt(this.y),
            Z: parseInt(this.z),
          },
        }
      );
    },

    setFocal(value) {
      this.Focal = value;
      UnrealService.setProperty(
        "/Game/UEDPIE_0_Main.Main:PersistentLevel.CineCameraActor_1.CameraComponent",
        "CurrentFocalLength",
        { CurrentFocalLength: parseInt(this.Focal) }
      );
    },

    setFocus(value) {
      console.log(value);
      this.Focus = value;
      UnrealService.setProperty(
        "/Game/UEDPIE_0_Main.Main:PersistentLevel.CineCameraActor_1.CameraComponent",
        "FocusSettings",
        { FocusSettings: { ManualFocusDistance: parseInt(this.Focus) } }
      );
    },
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
    }
  }
}
.focus-plane {
  justify-content: center;
  margin-left: 500px;
  margin-top: 50px;
}

.inline-center {
  margin-bottom: auto;
  display: flex;
  align-items: center;
  padding-left: 5px;
  justify-content: space-between;
  align-self: center;
  width: 300px;
}
.inline-left {
  display: flex;
}

.button {
  margin-top: 50px;
}

#printer {
  color: white;
  width: 200px;
  height: 50px;
  background-color: #1d222b;
  border: none;
}
</style>