<template>
  <div class="w-full md:w-6/12 lg:w-4/12 xl:w-3/12 px-3 py-3">
    <router-link :to="'/photos/' + gallery.slug + '/'">
      <div
        class="relative text-white w-full shadow-2xl p-2 bg-cover bg-center hover:border-red-800 border-8 border-white"
        style="min-height: 40vh"
        :style="{
          'background-image': featured_media
        }"
      >
        <div class="w-full absolute bottom-0 -ml-2 gallery-card">
          <h2
            v-html="gallery_title"
            class="text-xl font-semibold antialiased text-center open-sans bg-white text-gray-700 h-full"
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
