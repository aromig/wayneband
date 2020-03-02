<template>
  <header>
    <div
      class="relative flex items-center content-center justify-center pt-16 pb-32 bg-black"
      style="min-height: 40vh"
    >
      <div
        id="imageBackground"
        class="absolute top-0 w-full h-full overflow-hidden opacity-0"
      >
        <span
          class="absolute flex flex-col items-center justify-center w-full h-full opacity-75 colorOverlay"
        >
          <h1
            class="w-full text-4xl font-semibold text-center text-white shadow-2xl md:text-5xl patua-one"
            v-html="PageTitle"
          ></h1>
        </span>
        <div
          id="backgroundImage"
          class="w-full h-full bg-center bg-cover"
          :style="{ 'background-image': currentImage }"
        ></div>
      </div>
    </div>
  </header>
</template>

<script>
import wmc from "@/wmc";

export default {
  name: "CustomHeader",
  props: {
    PageTitle: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      bgImages: null,
      currentImage: null,
      nextImage: null
    };
  },
  methods: {
    async setHeaderImage() {
      this.bgImages = await wmc.bgImages();
      this.currentImage = `url('${
        this.bgImages[Math.floor(Math.random() * this.bgImages.length)]
      }')`;
    }
  },
  async created() {
    this.setHeaderImage();

    setTimeout(() => {
      document.getElementById("imageBackground").classList.remove("opacity-0");
    }, 500);
  }
};
</script>

<style scoped>
#imageBackground {
  transition: opacity 2s ease-in;
}

.colorOverlay {
  background: linear-gradient(160deg, #000000 60%, #c53030);
}

@media (min-width: 768px) {
}
</style>
