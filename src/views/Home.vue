<template>
  <div class="bg-black home">
    <header>
      <div
        class="relative flex items-center content-center justify-center pt-16 pb-16 overflow-hidden"
        style="min-height: 70vh"
      >
        <VideoBackground
          v-show="useVideoBg"
          :sources="videoSources"
          class="fixed h-full min-w-full overflow-hidden"
          style="width: 177.77777778vh; min-height: 56.25vw"
          id="videoBackground"
        >
          <span class="absolute w-full h-full opacity-75 colorOverlay"></span>
        </VideoBackground>
        <div
          v-show="!useVideoBg"
          class="fixed w-full h-full overflow-hidden opacity-0"
          id="imageBackground"
        >
          <span
            class="absolute z-50 w-full h-full opacity-75 colorOverlay"
          ></span>
          <div
            id="nextBackgroundImage"
            class="absolute left-0 z-40 w-full h-full bg-center bg-cover opacity-0 hide"
            :style="{ 'background-image': nextImage }"
          ></div>
          <div
            id="backgroundImage"
            class="w-full h-full bg-center bg-cover"
            :style="{ 'background-image': currentImage }"
          ></div>
        </div>
        <div class="container relative mx-auto opacity-0" id="logo-block">
          <div class="flex flex-wrap items-center">
            <div class="w-full px-4 ml-auto mr-auto text-center lg:w-6/12">
              <img
                src="/img/wayne_warriors_logo.png"
                class="mx-auto"
                alt="Wayne Warriors Logo"
              />
              <h1
                class="text-4xl antialiased font-semibold text-white text-shadow patua-one"
              >
                Wayne High School
              </h1>
              <h2 class="text-2xl font-thin text-white text-shadow patua-one">
                Marching Band &amp; Warriorettes
              </h2>
            </div>
          </div>
        </div>
      </div>
    </header>
    <HomeContent />
  </div>
</template>

<script>
import HomeContent from "@/components/HomeContent.vue";
import VideoBackground from "@/components/VideoBackground.vue";
import wmc from "@/wmc";
import { EventBus } from "@/event-bus";

export default {
  name: "home",
  components: {
    HomeContent,
    VideoBackground
  },
  data() {
    return {
      bgImages: null,
      currentImage: null,
      nextImage: null,
      useVideoBg: true,
      videoSources: wmc.bgVideos
    };
  },
  methods: {
    async initBackgroundImages() {
      this.bgImages = await wmc.bgImages();
      this.currentImage = `url('${
        this.bgImages[Math.floor(Math.random() * this.bgImages.length)]
      }')`;

      setInterval(() => {
        this.nextImage = `url('${
          this.bgImages[Math.floor(Math.random() * this.bgImages.length)]
        }')`;

        const nextBgDiv = document.getElementById("nextBackgroundImage");
        nextBgDiv.classList.remove("hide", "opacity-0");

        setTimeout(() => {
          this.currentImage = this.nextImage;
          nextBgDiv.classList.add("hide", "opacity-0");
        }, 3000);
      }, 10000);
    }
  },
  created() {
    EventBus.$on("toggle-video", value => {
      this.useVideoBg = value;
    });
  },
  mounted() {
    this.initBackgroundImages();
    setTimeout(() => {
      document.getElementById("logo-block").classList.remove("opacity-0");
    }, 1000);
    setTimeout(() => {
      document.getElementById("imageBackground").classList.remove("opacity-0");
    }, 1500);
  }
};
</script>

<style lang="scss" scoped>
#imageBackground,
#logo-block {
  transition: opacity 2s ease-in;
}

#nextBackgroundImage {
  transition: opacity 2s ease-in;
}

.hide {
  visibility: hidden;
}

.colorOverlay {
  background: linear-gradient(
    160deg,
    #c53030 0%,
    #000000 25%,
    #000000 75%,
    #c53030
  );
}

@keyframes zoomIn {
  0%,
  100% {
    transform: scale(1);
  }
  40%,
  60% {
    transform: scale(1.2);
  }
}
</style>
