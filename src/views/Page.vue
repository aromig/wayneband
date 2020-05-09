<template>
  <div class="bg-white">
    <custom-header :page-title="page.title" />

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
      <section
        :id="'page-' + page.id"
        class="w-10/12 py-4 mx-auto text-gray-900"
      >
        <div
          v-if="featured_media"
          class="mx-auto md:w-6/12 md:float-right md:m-8"
        >
          <img
            :src="featured_media"
            class="border-4 border-red-800 border-solid shadow-lg"
          />
        </div>

        <article
          v-html="page.content"
          id="page-content"
          class="w-full py-4 text-lg break-words lg:1/2 md:pr-12"
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
  name: "Page",
  components: {
    CustomHeader,
    SVGDivider,
  },
  data() {
    return {
      page: {},
      featured_media: "",
    };
  },
  methods: {
    dateToString(post_date) {
      return wmc.formatDate(post_date);
    },
    async fetchData(page_slug) {
      return await api.getPage(page_slug);
    },
    async fetchMedia(id) {
      return await api.getMedia(id);
    },
  },
  async created() {
    this.page = await this.fetchData(this.$route.params.slug);
    if (this.page.featured_media != 0) {
      this.featured_media = (
        await this.fetchMedia(this.page.featured_media)
      ).sizes.full.source_url;
    }
    document.title = `${this.page.title} - ${this.$route.meta.title}`;
  },

  beforeRouteUpdate(to, from, next) {
    this.slug = to.params.slug;
    next();
  },
};
</script>

<style lang="scss">
table {
  display: table;
  table-layout: auto;
  border-collapse: collapse;
  width: 100%;
  border: 3px solid #4a5568;

  & th:not(.has-text-align-center) {
    text-align: left;
  }
  & tr {
    font-size: 1rem;
    & :nth-child(2n) {
      background-color: #e2e8f0;
    }
  }
  & tr:nth-of-type(2n + 1) {
    background-color: inherit;
  }
  & tr:nth-of-type(1) {
    font-size: 1rem;
    background-color: inherit;
  }
  & td {
    padding-left: 2px;
  }
}

input #search {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  appearance: none;
  border-color: $gray-700;
  border-width: 1px;
  border-radius: 0.25rem;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: $gray-800;
  line-height: 1.25;
  &:focus {
    outline: 0;
    border-color: #c53030;
    box-shadow: 0 0 0 3px rgba(197, 48, 48, 0.5);
  }
}

.download_link {
  margin-left: 1rem;
  &:before {
    color: $link_color;
    content: "\f381\00a0";
    font-family: "Font Awesome 5 Free";
    font-size: 1.5rem;
    display: inline-block;
    padding-right: 3px;
    vertical-align: middle;
    font-weight: 900;
  }
}

.wp-block-embed__wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.wp-block-embed__wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
ul.wp-block-latest-posts li time {
  font-size: smaller;
  margin-left: 1rem;
}
</style>
