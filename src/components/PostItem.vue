<template>
  <article class="py-4 w-9/12 mx-auto post text-gray-900">
    <header>
      <h2 class="text-3xl font-semibold text-red-700">
        <router-link :to="post.path" class="hover:text-red-500 open-sans">
          {{ post.title }}
        </router-link>
      </h2>
    </header>

    <section class="my-1">
      <span class="open-sans font-semibold">{{ formatDate(post.date) }}</span>
      <p v-html="post.excerpt" class="mt-2"></p>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate: function(post_date) {
      const options = { month: "long", day: "numeric", year: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(
        new Date(post_date)
      );
    }
  }
};
</script>

<style lang="scss">
$link_color: #c53030;
$link_color_hover: #f56565;

.more-link,
.post {
  & section {
    font-size: 1.25em;
  }
  & a {
    color: $link_color;
    &:hover {
      color: $link_color_hover;
      text-decoration: underline;
    }
  }
}
</style>
