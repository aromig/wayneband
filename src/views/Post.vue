<template>
  <div class="bg-white">
    <custom-header :page-title="single_post.title" />

    <main class="relative pt-8 pb-12 bg-white">
      <HeaderDivider class="no-print" />
      <section :id="'post-' + single_post.id" class="w-10/12 py-4 mx-auto text-gray-900">
        <div v-if="featured_media" class="mx-auto md:w-6/12 md:float-right md:m-8">
          <img :src="featured_media" class="border-4 border-red-800 border-solid shadow-lg" />
        </div>
        <article class="w-full py-4 lg:1/2 md:1/2 md:pr-12">
          <span class="block mb-4 font-semibold text-md open-sans">
            {{
            date_formatted
            }}
          </span>
          <div v-html="single_post.content" id="post-content" class="w-full text-lg break-words" />
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import HeaderDivider from "@/components/HeaderDivider.vue";

import api from "@/wp-api";
import wmc from "@/wmc";

export default {
  name: "Post",
  components: {
    CustomHeader,
    HeaderDivider
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
$link_color: #c53030;
$link_color_hover: #f56565;
$text-gray-700: #4a5568;
$text-gray-800: #2d3748;

.text-shadow {
  text-shadow: 3px 3px 3px #000;
}

article {
  & h1,
  h2,
  h3 {
    font-family: "Open Sans";
  }
  & article {
    font-size: 1.25em;
  }
  & ul {
    list-style-type: disc;
    li {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
  }
  & ol {
    list-style-type: decimal;
    li {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
  }
  & .wp-block-group,
  .wp-block-image,
  .wp-block-button {
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
  figure.wp-block-gallery {
    max-width: 100%;
    ul.blocks-gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: 10px;
      list-style: none;
      li {
        margin: auto;
      }
    }
    &.columns-1 ul.blocks-gallery-grid {
      grid-template-columns: 1fr;
    }
    &.columns-2 ul.blocks-gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    &.columns-3 ul.blocks-gallery-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    &.columns-4 ul.blocks-gallery-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
