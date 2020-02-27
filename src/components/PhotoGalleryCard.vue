<template>
  <div class="w-full px-3 py-3 md:w-6/12 lg:w-4/12 xl:w-3/12">
    <router-link :to="'/photos/' + gallery.slug + '/'">
      <div
        class="relative w-full p-2 text-white bg-center bg-cover border-8 border-white shadow-2xl hover:border-red-800"
        style="min-height: 40vh"
        :style="{
          'background-image': featured_media
        }"
      >
        <div class="absolute bottom-0 w-full -ml-2 gallery-card">
          <h2
            v-html="gallery_title"
            class="h-full text-xl antialiased font-semibold text-center text-gray-700 bg-white open-sans"
          ></h2>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PhotoGalleryCard",
  props: {
    gallery: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      featured_media: ""
    };
  },
  methods: {
    getRandomPhoto(gallery) {
      const photo =
        gallery.gallery_data[
          Math.floor(Math.random() * gallery.gallery_data.length)
        ].src;
      this.featured_media = `url('${photo}')`;
    }
  },
  computed: {
    gallery_title() {
      return this.gallery.title.replace(/-/g, "&#8209;");
    }
  },
  async created() {
    this.getRandomPhoto(this.gallery);
  }
};
</script>

<style lang="scss" scoped>
.gallery-card {
  height: 3.5rem;
}
</style>
