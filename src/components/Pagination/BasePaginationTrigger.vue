<template>
  <span v-if="!isCurrentPage" class="base-pagination-trigger" @click="onClick">
    {{ pageNumber }}
  </span>
  <span v-else class="base-pagination-trigger currentPage">
    {{ pageNumber }}
  </span>
</template>

<script>
export default {
  props: {
    pageNumber: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number
    }
  },
  computed: {
    isCurrentPage() {
      return this.pageNumber == this.currentPage;
    }
  },
  methods: {
    onClick() {
      this.$emit("loadPage", this.pageNumber);
    }
  }
};
</script>

<style lang="scss">
.currentPage {
  color: #c53030;
}
</style>
