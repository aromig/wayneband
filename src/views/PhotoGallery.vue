<template>
  <div class="bg-white">
    <custom-header page-title="Photo Galleries" />

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
      <div
        id="photo_gallery"
        class="w-9/12 py-4 mx-auto text-gray-900 lg:w-10/12"
      ></div>

      <section class="pb-0 sm:px-2 md:px-16">
        <div class="container px-4 py-10 mx-auto md:px-0">
          <LoadingSpinner
            v-if="loading"
            class="mt-6"
            size="big"
            :line-size="8"
            :speed="1"
            message="Loading Photo Galleries..."
          />
          <div v-else>
            <BasePagination
              :current-page="currentPage"
              :page-count="pageCount"
              :visible-pages-count="visiblePagesCount"
              class="flex flex-row items-center justify-center mb-6 text-xl text-gray-800"
              @nextPage="pageChangeHandle('next')"
              @previousPage="pageChangeHandle('previous')"
              @loadPage="pageChangeHandle"
            />

            <div
              class="flex flex-wrap justify-center p-2 bg-gray-500 shadow-lg gallery-bg"
            >
              <PhotoGalleryCard
                v-for="gallery in galleries"
                :key="gallery.id"
                :gallery="gallery"
              />
            </div>

            <BasePagination
              :current-page="currentPage"
              :page-count="pageCount"
              :visible-pages-count="visiblePagesCount"
              class="flex flex-row items-center justify-center mt-6 text-xl text-gray-800"
              @nextPage="pageChangeHandle('next')"
              @previousPage="pageChangeHandle('previous')"
              @loadPage="pageChangeHandle"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import SVGDivider from "@/components/SVGDivider.vue";
import BasePagination from "@/components/Pagination/BasePagination.vue";
import PhotoGalleryCard from "@/components/PhotoGalleryCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import api from "@/wp-api";

export default {
  name: "PhotoGallery",
  components: {
    CustomHeader,
    SVGDivider,
    BasePagination,
    PhotoGalleryCard,
    LoadingSpinner
  },
  static: {
    GalleriesPerPage: 12
  },
  data() {
    return {
      galleries: [],
      currentPage: 1,
      pageCount: 0,
      visiblePagesCount: 5,
      loading: true
    };
  },
  methods: {
    async fetchGalleries(page = 1, per_page = 10) {
      let results = await api.getEnviraGalleries(page, per_page);
      return results;
    },

    async pageChangeHandle(value) {
      switch (value) {
        case "next":
          this.currentPage += 1;
          break;
        case "previous":
          this.currentPage -= 1;
          break;
        default:
          this.currentPage = value;
          break;
      }

      this.loading = true;

      const results = await this.fetchGalleries(
        this.currentPage,
        this.$options.static.GalleriesPerPage
      );
      this.galleries = results.data;
      this.pageCount = Math.ceil(
        results.total / this.$options.static.GalleriesPerPage
      );

      this.loading = false;
    }
  },
  watch: {
    pageCount() {
      this.visiblePagesCount =
        this.visiblePagesCount >= this.pageCount
          ? this.pageCount
          : this.visiblePagesCount;
    }
  },
  async created() {
    try {
      const results = await this.fetchGalleries(
        this.currentPage,
        this.$options.static.GalleriesPerPage
      );
      this.galleries = results.data;
      this.pageCount = Math.ceil(
        results.total / this.$options.static.GalleriesPerPage
      );

      this.loading = false;
    } catch (error) {
      throw error;
    }
  }
};
</script>

<style lang="scss" scoped>
#post-content p {
  margin: 1rem 0;
}

.gallery-bg {
  background: #a0aec0;
  background: linear-gradient(130deg, #a0aec0 0%, #4a5568 50%, #2d3748 100%);
}
</style>
