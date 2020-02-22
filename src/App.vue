<template>
  <div id="root">
    <NavBar />
    <div class="bg-white text-gray-800 min-h-screen">
      <keep-alive>
        <transition name="fade" mode="out-in">
          <router-view :key="$route.params.slug" />
        </transition>
      </keep-alive>
    </div>
    <Footer :key="$route.params.slug" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "wayneband",
  components: {
    NavBar,
    Footer
  },
  watch: {
    $route(to) {
      document.title =
        `${to.meta.title} - Wayne High School Marching Band and Warriorettes` ||
        "Wayne High School Marching Band and Warriorettes";
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Patua+One&display=swap");

@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap");

.patua-one {
  font-family: "Patua One";
}
.open-sans {
  font-family: "Open Sans";
}

$red-800: #c53030;
$link_color: #c53030;
$link_color_hover: #f56565;
$gray-800: #2d3748;
$gray-700: #4a5568;
$gray-600: #718096;
$gray-500: #a0aec0;
$gray-300: #e2e8f0;

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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $link_color;

    &.router-link-exact-active {
      color: $link_color;
    }

    &:hover {
      color: $link_color_hover;
    }
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
</style>
