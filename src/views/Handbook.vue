<template>
  <div>
    <custom-header page-title="Wayne Bands Handbook" />

    <main class="relative pt-8 pb-12 bg-white">
      <HeaderDivider class="no-print" />
      <div class="w-9/12 py-4 mx-auto text-gray-900">
        <section
          class="flex flex-wrap content-center justify-center p-2 bg-gray-500 border-4 border-red-800 shadow-lg gallery-bg"
        >
          <div v-for="pdf in handbookPDF" :key="pdf.id">
            <a @click="showPDF(pdf)" class="cursor-pointer">
              <pdf-card :pdf-file="pdf" />
            </a>
            <div class="flex flex-wrap justify-center w-full">
              <a :href="pdf.source_url" class="text-white hover:text-red-600 hover:underline">
                Download PDF
                <i class="fas fa-file-download" />
              </a>
            </div>
          </div>
        </section>

        <Modal
          :show-modal="isModalVisible"
          :title="shownPDFTitle"
          @close="closeModal"
          :modalStyle="{
            'background-color': '#ffffff',
            width: '90%',
            height: '90%',
            margin: '0 auto',
            border: '10px solid #fff',
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
import HeaderDivider from "@/components/HeaderDivider.vue";
import Modal from "@/components/Modal.vue";
import PdfCard from "@/components/PdfCard.vue";

import PDFViewer from "vue-instant-pdf-viewer";
import api from "@/wp-api";

export default {
  name: "Handbook",
  components: {
    CustomHeader,
    HeaderDivider,
    Modal,
    PdfCard,
    PDFViewer
  },
  data() {
    return {
      isModalVisible: false,
      handbookPDF: null,
      shownPDF: null,
      shownPDFTitle: null,
      HandbookCategory: 78
    };
  },
  methods: {
    async getHandbook() {
      let results = await api.getMediaByCategories([this.HandbookCategory], 1);
      return results.data.sort((a, b) => a.title < b.title);
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showPDF(pdf) {
      this.shownPDF = pdf.source_url;
      this.shownPDFTitle = pdf.title;
      this.isModalVisible = true;
    }
  },
  async mounted() {
    this.handbookPDF = await this.getHandbook();
  }
};
</script>

<style lang="scss">
.handbook {
  height: 90vh;
}
.modal {
  height: 90vh;
  width: 50vw;
}

.gallery-bg {
  background: #a0aec0;
  background: linear-gradient(130deg, #a0aec0 0%, #4a5568 50%, #2d3748 100%);
}
</style>
