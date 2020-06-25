<template>
  <div>
    <custom-header page-title="Drumbeat Newsletter" />

    <main class="relative pt-8 pb-12 bg-white">
      <HeaderDivider class="no-print" />
      <div class="w-9/12 py-4 mx-auto text-gray-900">
        <article class="w-full py-4 text-lg break-words lg:1/2 md:pr-12">
          The Drumbeat is the official newsletter of the Wayne Music Club. We
          aim for this newsletter to be an aggregated source of information on
          recent and upcoming Music Club activities.
        </article>
        <section
          class="flex flex-wrap content-center justify-center p-2 bg-gray-500 border-4 border-red-800 shadow-lg gallery-bg"
        >
          <div v-for="pdf in pdfList" :key="pdf.id">
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
          class
          @close="closeModal"
          :modalStyle="{
            'background-color': '#ffffff',
            width: '90%',
            height: '90%',
            margin: '0 auto',
            border: '10px solid #fff',
          }"
        >
          <div slot="title">
            <h2 class="text-3xl font-semibold text-red-800 hover:text-red-600 hover:underline">
              <a :href="shownPDF">
                Download PDF
                <i class="fas fa-file-download" />
              </a>
            </h2>
          </div>
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
  name: "Drumbeat",
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
      pdfList: null,
      shownPDF: null,
      shownPDFTitle: null,
      DrumbeatCategory: 5
    };
  },
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    showPDF(pdf) {
      this.shownPDF = pdf.source_url;
      this.shownPDFTitle = pdf.title;
      this.isModalVisible = true;
    },
    async getIssues() {
      let results = await api.getMediaByCategories(
        [this.DrumbeatCategory],
        100
      );
      return results.data.sort((a, b) => a.title < b.title);
    }
  },
  async mounted() {
    this.pdfList = await this.getIssues();
  }
};
</script>

<style lang="scss" scoped>
.modal {
  height: 90vh;
  width: 50vw;
}

.gallery-bg {
  background: #a0aec0;
  background: linear-gradient(130deg, #a0aec0 0%, #4a5568 50%, #2d3748 100%);
}
</style>
