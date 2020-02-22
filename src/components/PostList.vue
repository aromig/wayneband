<template>
  <div id="posts" class="py-20 border-none md:border-solid">
    <PostItem v-for="post in posts" :key="post.id" :post="post" />

    <BasePagination
      :current-page="currentPage"
      :page-count="pageCount"
      class="flex justify-center items-center text-xl"
      @nextPage="pageChangeHandle('next')"
      @previousPage="pageChangeHandle('previous')"
      @loadPage="pageChangeHandle"
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
    PostsPerPage: 5
  },
  data() {
    return {
      posts: [],
      currentPage: 1,
      pageCount: 0
    };
  },
  methods: {
    async fetchPosts(page = 1, per_page = 10) {
      let results = await api.getPosts(page, per_page);
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

      const results = await this.fetchPosts(
        this.currentPage,
        this.$options.static.PostsPerPage
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
