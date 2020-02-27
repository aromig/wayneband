<template>
  <div class="base-pagination">
    <BaseButton
      title="Go to previous page"
      :disabled="isPreviousButtonDisabled"
      @click.native="previousPage"
      class="hover:text-red-700"
    >
      <i class="fas fa-arrow-alt-circle-left"></i>
    </BaseButton>

    <BasePaginationTrigger
      v-for="paginationTrigger in paginationTriggers"
      :key="Math.floor(paginationTrigger)"
      :pageNumber="Math.floor(paginationTrigger)"
      :title="'Go to page ' + Math.floor(paginationTrigger)"
      class="relative inline-flex items-center px-4 mx-0 leading-5 cursor-pointer hover:text-red-700"
      @loadPage="onLoadPage"
    />

    <BaseButton
      title="Go to next page"
      :disabled="isNextButtonDisabled"
      @click.native="nextPage"
      class="hover:text-red-700"
    >
      <i class="fas fa-arrow-alt-circle-right"></i>
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from "@/components/Pagination/BaseButton.vue";
import BasePaginationTrigger from "@/components/Pagination/BasePaginationTrigger.vue";

export default {
  name: "BasePagination",
  components: {
    BaseButton,
    BasePaginationTrigger
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    },
    visiblePagesCount: {
      type: Number,
      default: 5
    }
  },
  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1;
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pageCount;
    },
    paginationTriggers() {
      const currentPage = this.currentPage;
      const pageCount = this.pageCount;
      const visiblePagesCount = this.visiblePagesCount;
      const visiblePagesThreshold = (visiblePagesCount - 1) / 2;
      const paginationTriggersArray = Array(this.visiblePagesCount - 1).fill(0);

      // The selected page number is smaller than half of the list width
      if (currentPage <= visiblePagesThreshold + 1) {
        paginationTriggersArray[0] = 1;
        const paginationTriggers = paginationTriggersArray.map(
          (paginationTrigger, index) => {
            return paginationTriggersArray[0] + index;
          }
        );

        paginationTriggers.push(pageCount);
        return paginationTriggers;
      }

      // The selected page number is bigger than half of the list width counting from the end of the list
      if (currentPage >= pageCount - visiblePagesThreshold + 1) {
        const paginationTriggers = paginationTriggersArray.map(
          (paginationTrigger, index) => {
            return pageCount - index;
          }
        );

        paginationTriggers.reverse().unshift(1);
        return paginationTriggers;
      }

      // All other cases
      paginationTriggersArray[0] = currentPage - visiblePagesThreshold + 1;
      const paginationTriggers = paginationTriggersArray.map(
        (paginationTrigger, index) => {
          return paginationTriggersArray[0] + index;
        }
      );

      paginationTriggers.unshift(1);
      paginationTriggers[paginationTriggers.length - 1] = pageCount;
      return paginationTriggers;
    }
  },
  methods: {
    previousPage() {
      this.$emit("previousPage");
    },
    nextPage() {
      this.$emit("nextPage");
    },
    onLoadPage(value) {
      this.$emit("loadPage", value);
    }
  }
};
</script>

<style></style>
