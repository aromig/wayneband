<template>
  <div class="bg-white">
    <custom-header :page-title="page.title" />

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
      <div
        :id="'page-' + page.id"
        class="py-4 w-9/12 lg:w-10/12 mx-auto text-gray-900"
      >
        <img
          v-if="featured_media"
          :src="featured_media"
          class="w-full lg:max-w-xl mx-auto mb-6 float-right rounded-lg"
        />

        <article
          v-html="page.content"
          id="page-content"
          class="py-4 break-words text-lg list-none"
        />
      </div>
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
    SVGDivider
  },
  data() {
    return {
      page: {},
      featured_media: ""
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
    }
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
  }
};
</script>

<style lang="scss">
$link_color: #c53030;
$link_color_hover: #f56565;
$text-gray-700: #4a5568;
$text-gray-800: #2d3748;

.text-shadow {
  text-shadow: 3px 3px 3px #000;
}

#page-content {
  & h1,
  h2,
  h3 {
    font-family: "Open Sans";
  }
  & article {
    font-size: 1.25em;
  }
  & .wp-block-group,
  .wp-block-image {
    display: block;
  }
  & .img-center img {
    display: block;
    margin: 0 auto;
  }
  & h2 {
    font-size: 1.5rem;
    margin: 1.5rem 0;
    color: #c53030;
    &.header_mail-::after {
      content: "\00a0\f658";
      font-family: "Font Awesome 5 Free";
      font-size: 1.25rem;
      display: inline-block;
      vertical-align: top;
      font-weight: 900;
    }
    &.header_band-::after {
      content: "\00a0\f001";
      font-family: "Font Awesome 5 Free";
      font-size: 1.25rem;
      display: inline-block;
      vertical-align: top;
      font-weight: 900;
    }
  }
  & h3 {
    font-size: 1.5rem;
  }
  & p {
    margin: 1rem 0;
    &.signup_link {
      margin-left: 1rem;
      &:before {
        color: $link_color;
        content: "\f14b\00a0";
        font-family: "Font Awesome 5 Free";
        font-size: 1.5rem;
        display: inline-block;
        padding-right: 3px;
        vertical-align: middle;
        font-weight: 900;
      }
    }
  }
  & .has-text-align-center {
    text-align: center;

    & strong {
      color: #c53030;
    }
  }
  & table {
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
  & a {
    color: $link_color;
    &:hover {
      color: $link_color_hover;
      text-decoration: underline;
    }
  }
  & hr.wp-block-separator {
    margin: 0.5rem;
    border: 1px solid #f53030;
  }

  & input#search {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    appearance: none;
    border-color: $text-gray-700;
    border-width: 1px;
    border-radius: 0.25rem;
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    color: $text-gray-800;
    line-height: 1.25;
  }
  & input#search:focus {
    outline: 0;
    border-color: #c53030;
    box-shadow: 0 0 0 3px rgba(197, 48, 48, 0.5);
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
</style>
