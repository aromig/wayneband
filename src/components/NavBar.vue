<template>
  <nav
    class="top-0 fixed z-40 w-screen flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-black"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link
          id="homepage_link"
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
          to="/"
          >Wayne Music Club</router-link
        >
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
      <div
        id="menu"
        class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none opacity-100"
        :class="{
          hidden: !showMenu,
          block: showMenu
        }"
      >
        <ul class="flex flex-col lg:flex-row list-none mr-auto"></ul>
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <router-link
              class="text-gray-600 hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold w-full"
              to="/announcements"
              title="Announcements"
            >
              <i class="fas fa-bullhorn text-2xl leading-lg mr-2"></i>
              <span class="lg:hidden inline-block ml-2">Announcements</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="text-gray-600 hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold w-full"
              to="/drumbeat"
              title="Drumbeat Newsletter"
            >
              <i class="fas fa-drum text-2xl leading-lg mr-2"></i>
              <span class="lg:hidden inline-block ml-2"
                >Drumbeat Newsletter</span
              >
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="lg:text-white text-gray-600 hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold w-full"
              to="/events"
              title="Events & Schedule"
            >
              <i class="fas fa-calendar-alt text-2xl leading-lg mr-2"></i>
              <span class="lg:hidden inline-block ml-2">Events & Schedule</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="text-gray-600 hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold w-full"
              to="/photos"
              title="Photo Galleries"
            >
              <i class="fas fa-camera text-2xl leading-lg"></i>
              <span class="lg:hidden inline-block ml-2">Photo Galleries</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <router-link
              class="text-gray-600 hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold w-full"
              to="/videos"
              title="Videos"
            >
              <i class="fas fa-film text-2xl leading-lg"></i>
              <span class="lg:hidden inline-block ml-2">Videos</span>
            </router-link>
          </li>
          <li class="flex items-center">
            <button
              class="bg-transparent text-gray-600 hover:text-gray-800 active:bg-gray-100 lg:hover:text-gray-300 lg:text-gray-600 text-xs font-bold uppercase px-4 py-2 lg:rounded lg:shadow lg:hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 mb-3 w-full lg:w-auto lg:px-2 lg:py-1 text-left"
              type="button"
              style="transition: all 0.5s ease 0s;"
              @click="toggleVideo($event, !videoOn)"
              :title="toggleVideoTitle"
            >
              <i id="videoOnOff" class="fas fa-video-slash text-2xl"></i>
              <span class="lg:hidden inline-block ml-2">{{
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
      localStorage.setItem("videoBgPref", false);
    } else {
      videoBgPref = videoBgPref == "true"; // convert true string to boolean
      this.toggleVideo(event, videoBgPref);
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
