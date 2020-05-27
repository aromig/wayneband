<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-auto w-full -mt-20 overflow-hidden pointer-events-none"
    style="height: 5.25rem; transform: translateZ(0px)"
  >
    <SVGDivider
      svgViewBox="0 0 3000 160"
      svgClass="absolute overflow-hidden"
      svgStyle="bottom: 2px"
      points="3000 0 3000 200 0 200 0 150"
      polyClass="text-red-800 fill-current"
      polyTransform="translate(0, -10)"
    />

    <SVGDivider
      svgViewBox="0 0 3000 100"
      svgClass="absolute bottom-0 overflow-hidden"
      points="3000 0 3000 200 0 100"
      polyClass="text-gray-100 fill-current"
      polyTransform="translate(0, 10)"
    />
  </div>
</template>

<script>
import SVGDivider from "@/components/SVGDivider.vue";

export default {
  name: "HeaderDivider",
  components: {
    SVGDivider
  }
};
</script>

<style>
</style>