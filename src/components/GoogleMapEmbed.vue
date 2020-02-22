<template>
  <div class="mapouter">
    <div class="gmap_canvas">
      <iframe
        :width="width"
        :height="height"
        id="gmap_canvas"
        :src="src_url"
        :frameborder="frameBorder"
        :scrolling="scrolling"
        :marginheight="marginHeight"
        :marginwidth="marginWidth"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoogleMapEmbed",
  props: {
    src_url: {
      required: true
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    frameBorder: {
      type: String,
      default: "0"
    },
    scrolling: {
      type: String,
      default: "no"
    },
    marginHeight: {
      type: String,
      default: "0"
    },
    marginWidth: {
      type: String,
      default: "0"
    }
  }
};
</script>

<style>
.mapouter {
  position: relative;
  text-align: right;
  min-height: 300px;
}

.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 100%;
  width: 100%;
}
</style>
