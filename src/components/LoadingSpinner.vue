<template>
  <div>
    <div class="loading-spinner" :style="spinner_style"></div>
    <div
      class="loading-spinner-text"
      :style="text_style"
      v-if="message.length > 0"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
var isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export default {
  props: {
    size: {
      default: 32
    },
    lineSize: {
      default: 3
    },
    lineBgColor: {
      type: String,
      default: "#718096"
    },
    lineFgColor: {
      type: String,
      default: "#c53030"
    },
    speed: {
      type: Number,
      default: 0.8
    },
    spacing: {
      type: Number,
      default: 4
    },
    message: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 13
    },
    textFgColor: {
      type: String,
      default: "#718096"
    }
  },
  computed: {
    size_px() {
      switch (this.size) {
        case "tiny":
          return 12;
        case "small":
          return 16;
        case "medium":
          return 32;
        case "large":
          return 48;
        case "big":
          return 64;
        case "huge":
          return 96;
        case "massive":
          return 128;
      }

      return isNumber(this.size) ? this.size : 32;
    },
    line_size_px() {
      switch (this.lineSize) {
        case "tiny":
          return 1;
        case "small":
          return 2;
        case "medium":
          return 3;
        case "large":
          return 3;
        case "big":
          return 4;
        case "huge":
          return 4;
        case "massive":
          return 5;
      }

      return isNumber(this.lineSize) ? this.lineSize : 4;
    },
    text_margin_top() {
      switch (this.size) {
        case "tiny":
        case "small":
        case "medium":
        case "large":
        case "big":
        case "huge":
        case "massive":
          return Math.min(Math.max(Math.ceil(this.size_px / 8), 3), 12);
      }

      return isNumber(this.spacing) ? this.spacing : 4;
    },
    text_font_size() {
      switch (this.size) {
        case "tiny":
        case "small":
        case "medium":
        case "large":
        case "big":
        case "huge":
        case "massive":
          return Math.min(Math.max(Math.ceil(this.size_px * 0.4), 11), 32);
      }

      return isNumber(this.fontSize) ? this.fontSize : 13;
    },
    spinner_style() {
      return {
        margin: "0 auto",
        "border-radius": "100%",
        border: this.line_size_px + "px solid " + this.lineBgColor,
        "border-top": this.line_size_px + "px solid " + this.lineFgColor,
        width: this.size_px + "px",
        height: this.size_px + "px",
        animation: "loading-spinner-spin " + this.speed + "s linear infinite"
      };
    },
    text_style() {
      return {
        "margin-top": this.text_margin_top + "px",
        color: this.textFgColor,
        "font-size": this.text_font_size + "px",
        "text-align": "center"
      };
    }
  }
};
</script>

<style>
.loading-spinner {
  transition: all 0.3s linear;
}

@keyframes loading-spinner-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
