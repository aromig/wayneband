<template>
  <div class="home bg-black">
    <header>
      <div
        class="relative pt-16 pb-16 flex content-center items-center justify-center overflow-hidden"
        style="min-height: 80vh"
      >
        <VideoBackground
          v-show="useVideoBg"
          :sources="videoSources"
          class="fixed h-full min-w-full"
          style="width: 177.77777778vh; min-height: 56.25vw"
          id="videoBackground"
        >
          <span class="w-full h-full absolute colorOverlay"></span>
        </VideoBackground>
        <div v-show="!useVideoBg" class="fixed w-full h-full overflow-hidden">
          <div
            id="backgroundImage"
            class="bg-center bg-cover"
            :style="{ 'background-image': currentImage }"
          >
            <span class="w-full h-full absolute opacity-75 colorOverlay"></span>
          </div>
        </div>
        <div class="container relative mx-auto opacity-0" id="logo-block">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <img
                src="/img/wayne_warriors_logo.png"
                class="mx-auto"
                alt="Wayne Warriors Logo"
              />
              <h1
                class="text-white font-semibold text-4xl antialiased text-shadow patua-one"
              >
                Wayne High School
              </h1>
              <h2 class="text-white font-thin text-2xl text-shadow patua-one">
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
        this.currentImage = `url('${
          this.bgImages[Math.floor(Math.random() * this.bgImages.length)]
        }')`;
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
      document.querySelector("#logo-block").classList.remove("opacity-0");
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.text-shadow {
  text-shadow: 3px 3px 3px #000;
}

#logo-block {
  transition: opacity 2s ease-in;
}

#backgroundImage {
  height: 100%;
  width: 100%;
  transition: background-image 1s linear;
  animation: zoomIn 20s infinite;
}

.colorOverlay {
  opacity: 90%;
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
