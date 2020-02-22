<template>
  <div class="bg-white">
    <custom-header :page-title="single_post.title" />

    <main class="relative bg-white pt-8 pb-12">
      <div
        class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
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
      <section
        :id="'post-' + single_post.id"
        class="py-4 w-9/12 lg:w-10/12 mx-auto text-gray-900"
      >
        <img
          v-if="featured_media"
          :src="featured_media"
          class="w-full lg:max-w-xl mx-auto mb-6 float-right rounded-lg"
        />

        <span class="text-md font-semibold open-sans">{{
          date_formatted
        }}</span>
        <div
          v-html="single_post.content"
          id="post-content"
          class="py-4 break-words text-lg list-none"
        />
      </section>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import SVGDivider from "@/components/SVGDivider.vue";

import api from "@/wp-api";
import wmc from "@/wmc";

export default {
  name: "Post",
  components: {
    CustomHeader,
    SVGDivider
  },
  data() {
    return {
      single_post: {},
      date_formatted: null,
      featured_media: ""
    };
  },
  methods: {
    dateToString(post_date) {
      return wmc.formatDate(post_date);
    },
    async fetchData(post_slug) {
      return await api.getPost(post_slug);
    },
    async fetchMedia(id) {
      return await api.getMedia(id);
    }
  },
  async created() {
    this.single_post = await this.fetchData(this.$route.params.slug);
    if (this.single_post.featured_media != 0) {
      this.featured_media = (
        await this.fetchMedia(this.single_post.featured_media)
      ).sizes.full.source_url;
    }
    document.title = `${this.single_post.title} - ${this.$route.meta.title}`;

    this.date_formatted = this.dateToString(this.single_post.date);
  },
  beforeRouteUpdate(to, from, next) {
    this.slug = to.params.slug;
    next();
  }
};
</script>

<style lang="scss">
.text-shadow {
  text-shadow: 3px 3px 3px #000;
}

#post-content p {
  margin: 1rem 0;
}
</style>
