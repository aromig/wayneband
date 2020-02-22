<template>
  <header>
    <div
      class="relative pt-16 pb-32 flex content-center items-center justify-center"
      style="min-height: 40vh"
    >
      <div class="absolute top-0 w-full h-full overflow-hidden">
        <div
          id="backgroundImage"
          class="bg-center bg-cover"
          :style="{ 'background-image': currentImage }"
        >
          <span
            class="w-full h-full flex flex-col absolute items-center opacity-75 colorOverlay justify-center"
          >
            <h1
              class="text-white text-4xl md:text-5xl w-full text-center shadow-2xl font-semibold patua-one"
              v-html="PageTitle"
            ></h1>
          </span>
        </div>
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
      currentImage: null
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
    },
    async setHeaderImage() {
      if (this.bgImages == null) this.initBackgroundImages();
    }
  },
  async created() {
    this.setHeaderImage();
  }
};
</script>

<style scoped>
#backgroundImage {
  height: 100%;
  width: 100%;
  transition: background-image 1s linear;
}

.colorOverlay {
  background: linear-gradient(160deg, #000000 60%, #c53030);
}

@media (min-width: 768px) {
}
</style>
