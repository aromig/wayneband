<template>
  <div id="root">
    <NavBar class="no-print" />
    <div class="min-h-screen text-gray-800 bg-white">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view :key="$route.params.slug" />
        </transition>
      </keep-alive>
    </div>
    <Footer :key="$route.params.slug" class="no-print" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "wayneband",
  components: {
    NavBar,
    Footer,
  },
  methods: {
    decodeHtml(html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
  },
  watch: {
    $route(to) {
      document.title =
        to.meta.title.length > 0
          ? this.decodeHtml(
              `${to.meta.title} - Wayne High School Marching Band and Warriorettes`
            )
          : "Wayne High School Marching Band and Warriorettes";
    },
  },
};
</script>

<style lang="scss">
@use "./assets/css/_variables.scss" as *;
@import url("https://fonts.googleapis.com/css?family=Patua+One&display=swap");

@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap");

.patua-one {
  font-family: "Patua One";
}
.open-sans {
  font-family: "Open Sans";
}

html {
  scroll-behavior: smooth;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $gray-800;
}

.text-shadow {
  text-shadow: 3px 3px 3px #000;
}

article {
  font-size: 1rem;
  & h1,
  h2,
  h3 {
    font-family: "Open Sans";
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
    margin: 1rem 0;
    color: #c53030;
  }
  & h3 {
    font-size: 1.5rem;
  }
  & h4 {
    font-size: 1.25rem;
    font-weight: 500;
  }
  & p {
    margin: 1rem 0;
  }
  .signup_link {
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

  & .has-text-align-center {
    text-align: center;

    & strong {
      color: #c53030;
    }
  }
  & a {
    color: $link_color;
    &:hover {
      color: $link_color_hover;
      text-decoration: underline;
    }

    & hr.wp-block-separator {
      margin: 0.5rem;
      border: 1px solid #f53030;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
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

  .wp-block-file__button {
    color: $red-800;
    border: 1px solid $gray-600;
    margin: 0 15px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 1px 1px 5px $gray-600;

    &:hover {
      font-size: 95%;
      background-color: $gray-300;
      margin: 0 18px;
      padding: 4px;
      box-shadow: 0 0 3px $gray-600;
    }

    &:active {
      background-color: $gray-500;
    }
  }
}

.print-only {
  display: none;
}

@media print {
  .no-print,
  .no-print * {
    display: none !important;
  }
  .print-only {
    display: inherit;
  }
}
</style>
