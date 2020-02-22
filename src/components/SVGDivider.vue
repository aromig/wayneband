<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    version="1.1"
    :class="svgClass"
    :viewBox="svgViewBox"
    :style="svgStyle"
    x="0"
    y="0"
  >
    <polygon
      :class="polyClass"
      :style="polyStyle"
      :transform="polyTransform"
      :points="points"
    ></polygon>
  </svg>
</template>

<script>
export default {
  name: "Divider",
  props: {
    points: {
      type: String,
      required: true
    },
    svgViewBox: {
      type: String,
      required: true
    },
    polyClass: {
      type: String,
      required: false
    },
    polyStyle: {
      type: String,
      required: false
    },
    svgClass: {
      type: String,
      required: false
    },
    svgStyle: {
      type: String,
      required: false
    },
    polyTransform: {
      type: String,
      required: false
    }
  }
};
</script>

<style></style>
