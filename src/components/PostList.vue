<template>
  <div id="posts" class="py-20 border-none md:border-solid">
    <input
      type="text"
      id="search"
      placeholder="Filter posts"
      class="block w-9/12 px-4 mx-auto text-xl border-2 border-gray-400 shadow-lg focus:border-red-400"
      @keyup="searchHandler"
      @keydown="clearSearchHandlerTimeout"
      v-model="filterPosts"
    />

    <BasePagination
      :current-page="currentPage"
      :page-count="pageCount"
      :visible-pages-count="visiblePages"
      class="flex items-center justify-center mt-8 text-xl"
      @nextPage="pageChangeHandler('next')"
      @previousPage="pageChangeHandler('previous')"
      @loadPage="pageChangeHandler"
    />

    <PostItem v-for="post in posts" :key="post.id" :post="post" />

    <BasePagination
      :current-page="currentPage"
      :page-count="pageCount"
      :visible-pages-count="visiblePages"
      class="flex items-center justify-center text-xl"
      @nextPage="pageChangeHandler('next')"
      @previousPage="pageChangeHandler('previous')"
      @loadPage="pageChangeHandler"
    />
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
import BasePagination from "@/components/Pagination/BasePagination.vue";

import api from "@/wp-api";

export default {
  name: "PostList",
  components: {
    PostItem,
    BasePagination
  },
  static: {
    PostsPerPage: 5,
    MaxVisiblePages: 5
  },
  data() {
    return {
      posts: [],
      currentPage: 1,
      pageCount: 0,
      filterPosts: "",
      typingTimeout: null,
      visiblePages: this.MaxVisiblePages
    };
  },
  methods: {
    async fetchPosts(page = 1, per_page = 10, keywords = "") {
      let results = await api.getPosts(page, per_page, keywords);
      return results;
    },

    searchHandler() {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(async () => {
        const results = await this.fetchPosts(
          1,
          this.$options.static.PostsPerPage,
          this.filterPosts
        );
        this.posts = results.data;
        this.currentPage = 1;
        this.pageCount = Math.ceil(
          results.total / this.$options.static.PostsPerPage
        );
        this.visiblePages = Math.min(
          this.$options.static.MaxVisiblePages,
          this.pageCount
        );
      }, 1000);
    },

    clearSearchHandlerTimeout() {
      clearTimeout(this.typingTimeout);
    },

    async pageChangeHandler(value) {
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

      const results = await this.fetchPosts(
        this.currentPage,
        this.$options.static.PostsPerPage,
        this.filterPosts
      );
      this.posts = results.data;
      this.pageCount = Math.ceil(
        results.total / this.$options.static.PostsPerPage
      );
    }
  },
  async mounted() {
    try {
      const results = await this.fetchPosts(
        this.currentPage,
        this.$options.static.PostsPerPage
      );
      this.posts = results.data;
      this.pageCount = Math.ceil(
        results.total / this.$options.static.PostsPerPage
      );
    } catch (error) {
      throw error;
    }
  }
};
</script>

<style lang="scss">
$link_color: #c53030;
$link_color_hover: #f56565;

#posts {
  border-left-width: 3px;
  border-right-width: 3px;
  border-left-color: $link_color;
  border-right-color: $link_color;
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: inset 0px 60px 25px -10px rgba(0, 0, 0, 0.5);
}
</style>
