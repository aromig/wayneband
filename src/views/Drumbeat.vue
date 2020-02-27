<template>
  <div>
    <custom-header page-title="Drumbeat Newsletter" />

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
      <div class="w-9/12 py-4 mx-auto text-gray-900">
        <Modal
          :show-modal="isModalVisible"
          class="modal"
          @close="closeModal"
          :modalStyle="{
            'background-color': '#ffffff',
            width: '70%',
            height: '90%',
            margin: '0 auto',
            border: '10px solid #fff'
          }"
        >
          <PDFViewer slot="body" :url="shownPDF" height="100%" />
        </Modal>
      </div>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import SVGDivider from "@/components/SVGDivider.vue";
import Modal from "@/components/Modal.vue";

import PDFViewer from "vue-instant-pdf-viewer";

export default {
  name: "Drumbeat",
  components: {
    CustomHeader,
    SVGDivider,
    Modal,
    PDFViewer
  },
  data() {
    return {
      isModalVisible: false,
      shownPDF: "/pdf/WMC Drumbeat 22_09.pdf"
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.modal {
  height: 90vh;
  width: 50vw;
}
</style>
