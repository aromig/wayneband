<template>
  <nav
    class="fixed top-0 z-40 flex flex-wrap items-center justify-between w-screen px-2 py-3 bg-black navbar-expand-lg"
  >
    <div
      class="container flex flex-wrap items-center justify-between px-4 mx-auto"
    >
      <div
        class="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link
          id="homepage_link"
          class="inline-block py-2 mr-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-no-wrap"
          to="/"
          >Wayne Music Club</router-link
        >
        <button
          class="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
      <div
        id="menu"
        class="items-center flex-grow bg-white opacity-100 lg:flex lg:bg-transparent lg:shadow-none"
        :class="{
          hidden: !showMenu,
          block: showMenu
        }"
      >
        <ul class="flex flex-col mr-auto list-none lg:flex-row"></ul>
        <ul class="flex flex-col list-none lg:flex-row lg:ml-auto">
          <li class="flex items-center">
            <router-link
              class="flex items-center w-full px-3 py-4 text-xs font-bold text-gray-600 uppercase hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 lg:py-2"
              to="/announcements"
              title="Announcements"
            >
              <i class="mr-2 text-2xl fas fa-bullhorn leading-lg"></i>
              <span class="inline-block ml-2 lg:hidden">Announcements</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="flex items-center w-full px-3 py-4 text-xs font-bold text-gray-600 uppercase hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 lg:py-2"
              to="/drumbeat"
              title="Drumbeat Newsletter"
            >
              <i class="mr-2 text-2xl fas fa-drum leading-lg"></i>
              <span class="inline-block ml-2 lg:hidden"
                >Drumbeat Newsletter</span
              >
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="flex items-center w-full px-3 py-4 text-xs font-bold text-gray-600 uppercase lg:text-white hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 lg:py-2"
              to="/events"
              title="Events & Schedule"
            >
              <i class="mr-2 text-2xl fas fa-calendar-alt leading-lg"></i>
              <span class="inline-block ml-2 lg:hidden">Events & Schedule</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="flex items-center w-full px-3 py-4 text-xs font-bold text-gray-600 uppercase hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 lg:py-2"
              to="/concessions"
              title="Concessions"
            >
              <i class="text-2xl fas fa-hamburger leading-lg"></i>
              <span class="inline-block ml-2 lg:hidden">Concessions</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="flex items-center w-full px-3 py-4 text-xs font-bold text-gray-600 uppercase hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 lg:py-2"
              to="/photos"
              title="Photo Galleries"
            >
              <i class="text-2xl fas fa-camera leading-lg"></i>
              <span class="inline-block ml-2 lg:hidden">Photo Galleries</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="flex items-center w-full px-3 py-4 text-xs font-bold text-gray-600 uppercase hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 lg:py-2"
              to="/videos"
              title="Videos"
            >
              <i class="text-2xl fas fa-film leading-lg"></i>
              <span class="inline-block ml-2 lg:hidden">Videos</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <button
              class="w-full px-4 py-2 mb-3 text-xs font-bold text-left text-gray-600 uppercase bg-transparent outline-none hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 lg:rounded lg:shadow lg:hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0 lg:w-auto lg:px-2 lg:py-1"
              type="button"
              style="transition: all 0.5s ease 0s;"
              @click="toggleVideo($event, !videoOn)"
              :title="toggleVideoTitle"
            >
              <i id="videoOnOff" class="text-2xl fas fa-video"></i>
              <span class="inline-block ml-2 lg:hidden">{{
                toggleVideoTitle
              }}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { EventBus } from "@/event-bus";

window.addEventListener("scroll", () => {
  let nav = document.querySelector("nav");

  if (window.scrollY > 400) {
    if (!nav.classList.contains("scrolled")) {
      nav.classList.add("scrolled", "border-bottom");
    }
  } else {
    if (nav.classList.contains("scrolled")) {
      nav.classList.remove("scrolled", "border-bottom");
    }
  }
});

export default {
  data() {
    return {
      showMenu: false,
      videoOn: true,
      toggleVideoTitle: "Toggle Video Off"
    };
  },
  methods: {
    toggleNavbar() {
      this.showMenu = !this.showMenu;
    },
    toggleVideo(event, videoOn) {
      this.videoOn = videoOn;
      EventBus.$emit("toggle-video", this.videoOn);

      if (typeof Storage !== "undefined") {
        localStorage.setItem("videoBgPref", this.videoOn);
      }
    }
  },
  watch: {
    videoOn() {
      if (this.videoOn) {
        document.getElementById("videoOnOff").classList.add("fa-video");
        document
          .getElementById("videoOnOff")
          .classList.remove("fa-video-slash");
        this.toggleVideoTitle = "Toggle Video Off";
      } else {
        document.getElementById("videoOnOff").classList.add("fa-video-slash");
        document.getElementById("videoOnOff").classList.remove("fa-video");
        this.toggleVideoTitle = "Toggle Video On";
      }
    }
  },
  mounted() {
    let videoBgPref = localStorage.getItem("videoBgPref");
    if (videoBgPref === null) {
      localStorage.setItem("videoBgPref", true);
    } else {
      videoBgPref = videoBgPref == "true"; // convert true string to boolean
      setTimeout(() => {
        this.toggleVideo(event, videoBgPref);
      }, 1000);
    }

    document.getElementById("homepage_link").addEventListener("click", () => {
      this.showMenu = false;
    });

    let menuLinks = document.querySelectorAll("#menu ul li a");
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        this.showMenu = false;
      });
    });
  }
};
</script>

<style lang="scss">
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

nav {
  border-bottom: 0px solid #c53030;
  opacity: 0.9;
  transition-property: opacity, border-bottom-width;
  transition-duration: 1s, 0.2s;
  transition-timing-function: ease, ease-in;
  &.scrolled {
    opacity: 1;
  }
  &.border-bottom {
    border-bottom-width: 2px;
  }
}

a {
  transition: color 0.5s ease;
}
</style>
