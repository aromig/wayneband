<template>
  <article class="w-9/12 py-2 mx-auto text-gray-900 post">
    <header>
      <h2 class="mb-0 text-2xl font-semibold text-red-700">
        <router-link :to="post.path" class="hover:text-red-500 open-sans" v-html="post.title" />
      </h2>
    </header>

    <section class="my-0">
      <span class="font-semibold open-sans">{{ formatDate(post.date) }}</span>
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
@use "../assets/css/_variables.scss" as *;

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
