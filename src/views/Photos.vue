<template>
  <div class="bg-white">
    <custom-header :page-title="gallery.title" />
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

      <section class="w-9/12 py-4 mx-auto text-gray-900 lg:w-10/12">
        <LoadingSpinner
          v-if="loading"
          class="mt-6"
          size="big"
          :line-size="8"
          :speed="1"
          message="Loading Gallery..."
        />

        <div v-else>
          <BasePagination
            :current-page="currentPage"
            :page-count="pageCount"
            :visible-pages-count="visiblePagesCount"
            class="flex flex-row items-center justify-center my-6 text-xl text-gray-800"
            @nextPage="pageChangeHandle('next')"
            @previousPage="pageChangeHandle('previous')"
            @loadPage="pageChangeHandle"
          />

          <div class="grid p-4 border-8 border-red-800 shadow-lg gallery-bg">
            <div
              v-for="photo in photos"
              :key="photo.id"
              :style="{
                'background-image': `url('${photo.thumb.source_url}')`
              }"
              class="bg-center bg-cover border-8 border-white shadow-2xl cursor-pointer hover:border-red-800"
            >
              <a
                class="inline-block w-full h-full"
                target="_blank"
                @click="showModal(photo)"
              />
            </div>
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
      </section>
    </main>

    <ImageModal
      :show-modal="isModalVisible"
      :title="clicked_photo.title"
      :orientation="clicked_photo.orientation"
      :photo-index="clicked_photo_index"
      @close="closeModal"
      @previous="showPreviousImage"
      @next="showNextImage"
    >
      <div slot="title" />

      <img
        id="current_photo"
        :src="clicked_photo.full.source_url"
        slot="body"
        class="object-cover"
      />

      <div
        slot="footer"
        v-html="gallery.title"
        class="text-xl antialiased text-gray-700 patua-one"
      />
    </ImageModal>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import SVGDivider from "@/components/SVGDivider.vue";
import BasePagination from "@/components/Pagination/BasePagination.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ImageModal from "@/components/ImageModal.vue";

import api from "@/wp-api";

export default {
  name: "photos",
  components: {
    CustomHeader,
    SVGDivider,
    BasePagination,
    LoadingSpinner,
    ImageModal
  },
  static: {
    PhotosPerPage: 20
  },
  data() {
    return {
      gallery: {},
      allPhotos: [],
      photos: [],
      photoTotal: 0,
      currentPage: 1,
      pageCount: 0,
      visiblePagesCount: 5,
      loading: true,
      photoLoading: false,
      isModalVisible: false,
      clicked_photo: { title: null, full: { source_url: null } },
      clicked_photo_index: null
    };
  },
  methods: {
    async fetchGallery(gallery_slug) {
      return await api.getEnviraGallery(gallery_slug);
    },
    async fetchMedia(id) {
      return await api.getMedia(id);
    },
    async parsePhotos(gallery_data) {
      const photos = gallery_data.map(async data => {
        return await this.fetchMedia(data.id).then(results => {
          return {
            id: results.id,
            title: results.sizes.full.file,
            thumb: results.sizes.medium_large,
            full: results.sizes.full,
            orientation: results.orientation
          };
        });
      });
      return Promise.all(photos).then(results => results);
    },
    getCurrentPagePhotos(page, per_page) {
      return this.allPhotos.filter((photo, index) => {
        const lowerBound = (page - 1) * per_page;
        const upperBound = lowerBound + per_page - 1;

        return index >= lowerBound && index <= upperBound;
      });
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

      this.photos = this.getCurrentPagePhotos(
        this.currentPage,
        this.$options.static.PhotosPerPage
      );
    },
    showModal(photo) {
      this.clicked_photo = photo;
      this.clicked_photo_index = this.photos.indexOf(photo);
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showPreviousImage(index) {
      this.clicked_photo_index = index > 0 ? index - 1 : this.photos.length - 1;
      this.clicked_photo = this.photos[this.clicked_photo_index];
    },
    showNextImage(index) {
      this.clicked_photo_index = index < this.photos.length - 1 ? index + 1 : 0;
      this.clicked_photo = this.photos[this.clicked_photo_index];
    }
  },
  async created() {
    try {
      this.gallery = await this.fetchGallery(this.$route.params.slug);
      this.allPhotos = await this.parsePhotos(this.gallery.gallery_data);

      this.photos = this.getCurrentPagePhotos(
        this.currentPage,
        this.$options.static.PhotosPerPage
      );

      this.photoTotal = this.allPhotos.length;
      this.pageCount = Math.ceil(
        this.photoTotal / this.$options.static.PhotosPerPage
      );

      document.title = `Photos: ${this.gallery.title} - ${this.$route.meta.title}`;

      this.loading = false;
    } catch (error) {
      throw error;
    }
  },
  watch: {
    pageCount() {
      this.visiblePagesCount =
        this.visiblePagesCount >= this.pageCount
          ? this.pageCount
          : this.visiblePagesCount;
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  grid-gap: 10px;
  grid-auto-flow: dense;
  grid-auto-columns: auto;

  & div {
    height: 100%;
  }
}

@media (min-width: 640px) {
  .grid div {
    &:nth-of-type(3n) {
      grid-row: span 2;
      grid-column: span 1;
    }
    &:nth-of-type(6n) {
      grid-row: span 2;
      grid-column: span 2;
    }
    &:nth-of-type(5n) {
      grid-row: span 1;
      grid-column: span 2;
    }
  }
}

.gallery-bg {
  background: #a0aec0;
  background: linear-gradient(130deg, #a0aec0 0%, #4a5568 50%, #2d3748 100%);
}
</style>
