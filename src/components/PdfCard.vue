<template>
  <div
    class="relative p-2 m-2 text-center bg-gray-300 border-8 border-white hover:border-red-800"
  >
    <i class="text-5xl text-red-800 fas fa-file-pdf"></i>
    <h3 v-html="PdfFile.title" class="antialiased font-semibold"></h3>
    <span v-html="PdfFile.caption" />
  </div>
</template>

<script>
export default {
  name: "PdfCard",
  props: {
    PdfFile: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
