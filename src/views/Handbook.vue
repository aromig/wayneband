<template>
  <div>
    <custom-header page-title="Wayne Bands Handbook" />

    <main class="relative pt-8 pb-12 bg-white">
      <div
        class="absolute top-0 left-0 right-0 bottom-auto w-full -mt-20 overflow-hidden pointer-events-none"
        style="height: 80px; transform: translateZ(0px);"
      >
        <SVGDivider
          svgViewBox="0 0 2560 150"
          svgClass="absolute bottom-0 overflow-hidden"
          points="2560 0 2560 200 0 200 0 150"
          polyClass="text-red-800 fill-current"
          polyTransform="translate(0, -10)"
        />
        <SVGDivider
          svgViewBox="0 0 2560 100"
          svgClass="absolute bottom-0 overflow-hidden"
          points="2560 0 2560 200 0 100"
          polyClass="text-white fill-current"
          polyTransform="translate(0, 10)"
        />
      </div>
      <div class="w-11/12 py-4 mx-auto text-gray-900 md:w-9/12 handbook">
        <PDFViewer slot="body" :url="handbookPDF" height="100%" />
      </div>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import SVGDivider from "@/components/SVGDivider.vue";

import PDFViewer from "vue-instant-pdf-viewer";
import api from "@/wp-api";

export default {
  name: "Handbook",
  components: {
    CustomHeader,
    SVGDivider,
    PDFViewer,
  },
  data() {
    return {
      handbookPDF: null,
      HandbookCategory: 78,
    };
  },
  methods: {
    async getHandbook() {
      let results = await api.getMediaByCategories([this.HandbookCategory], 1);
      return results.data[0].source_url;
    },
  },
  async mounted() {
    this.handbookPDF = await this.getHandbook();
  },
};
</script>

<style lang="scss">
.handbook {
  height: 90vh;
}
</style>
