<template>
  <div>
    <div class="input-group color-picker" ref="colorpicker">
      <input
        type="text"
        class="form-control"
        :value="colorValue"
        :disabled="disabled"
        @focus="showPicker()"
        @input="updateFromInput"
      >
      <span class="input-group-addon color-picker-container">
        <span
          class="current-color"
          :style="'background-color: ' + colorValue"
          @click="togglePicker()"
        ></span>
        <colorpicker :value="colors" @input="updateFromPicker" v-if="displayPicker"/>
      </span>
    </div>
  </div>
</template>

<style scoped>
.vc-chrome {
  position: absolute;
  top: 35px;
  right: 0;
  z-index: 9;
}
.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: pointer;
}
.color-picker-container {
  width: 50px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-group {
  width: 100% !important;
}
input {
  border-radius: none;
  border: 2px solid #f5f5f5;
}
</style>

<script>
import { Chrome } from "vue-color";

export default {
  components: { colorpicker: Chrome },
  data() {
    return {
      defaultColor: "#000000",
      colors: {
        hex: "#000000"
      },
      //   colorValue: "",
      displayPicker: false
    };
  },
  props: {
    colorValue: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setColor(color) {
      //   this.updateColors(color);
      //   this.selectedColor = color;
      //   color = "#000000";
      this.$emit("updatePrimaryColor", color);
    },
    updateColors(color) {
      if (color.slice(0, 1) == "#") {
        this.colors = {
          hex: color
        };
      } else if (color.slice(0, 4) == "rgba") {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
          hex =
            "#" +
            (
              (1 << 24) +
              (parseInt(rgba[0]) << 16) +
              (parseInt(rgba[1]) << 8) +
              parseInt(rgba[2])
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3]
        };
      }
    },
    showPicker() {
      document.addEventListener("click", this.documentClick);
      this.displayPicker = true;
    },
    hidePicker() {
      document.removeEventListener("click", this.documentClick);
      this.displayPicker = false;
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
      console.log("Updated!");
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a == 1) {
        // this.selectedColor = color.hex;
        let x =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
        let shadow =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          (color.rgba.a - .4) +
          ")";
        let colorX = { x, shadow };
        this.$emit("updatePrimaryColor", colorX);
      } else {
        this.selectedColor =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
      }
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== target && !el.contains(target)) {
        this.hidePicker();
      }
    }
  },
  mounted() {
    // this.setColor(this.value);
  }
  //   computed: {
  //     selectedColor: {
  //       get() {
  //         return this.value;
  //       },
  //       set(newColor) {
  //         // this.value = newColor;
  //         this.value = newColor;
  //         this.$emit("updatePrimaryColor", newColor);
  //       }
  //     }
  //   },
  //   methods: {
  //     setColor(color) {
  //       this.updateColors(color);
  //       this.selectedColor = color;
  //       this.$emit("updatePrimaryColor", this.selectedColor);
  //     },
  //     updateColors(color) {
  //       if (color.slice(0, 1) == "#") {
  //         this.colors = {
  //           hex: color
  //         };
  //       } else if (color.slice(0, 4) == "rgba") {
  //         var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
  //           hex =
  //             "#" +
  //             (
  //               (1 << 24) +
  //               (parseInt(rgba[0]) << 16) +
  //               (parseInt(rgba[1]) << 8) +
  //               parseInt(rgba[2])
  //             )
  //               .toString(16)
  //               .slice(1);
  //         this.colors = {
  //           hex: hex,
  //           a: rgba[3]
  //         };
  //       }
  //     },
  //     showPicker() {
  //       document.addEventListener("click", this.documentClick);
  //       this.displayPicker = true;
  //     },
  //     hidePicker() {
  //       document.removeEventListener("click", this.documentClick);
  //       this.displayPicker = false;
  //     },
  //     togglePicker() {
  //       this.displayPicker ? this.hidePicker() : this.showPicker();
  //     },
  //     updateFromInput() {
  //       this.updateColors(this.selectedColor);
  //       console.log("Updated!");
  //     },
  //     updateFromPicker(color) {
  //       this.colors = color;
  //       if (color.rgba.a == 1) {
  //         this.selectedColor = color.hex;
  //       } else {
  //         this.selectedColor =
  //           "rgba(" +
  //           color.rgba.r +
  //           ", " +
  //           color.rgba.g +
  //           ", " +
  //           color.rgba.b +
  //           ", " +
  //           color.rgba.a +
  //           ")";
  //       }
  //     },
  //     documentClick(e) {
  //       var el = this.$refs.colorpicker,
  //         target = e.target;
  //       if (el !== target && !el.contains(target)) {
  //         this.hidePicker();
  //       }
  //     }
  //   },
  //   watch: {
  //     selectedColor(val) {
  //       if (val) {
  //         this.updateColors(val);
  //         // this.$emit("input", val);
  //         this.$emit("updatePrimaryColor", this.selectedColor);
  //         //document.body.style.background = val;
  //       }
  //     }
  //   }
};
</script>
