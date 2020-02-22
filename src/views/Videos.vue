<template>
  <div class="bg-white">
    <custom-header page-title="Performance Videos" />

    <main class="relative bg-white text-gray-800 pt-2 pb-10">
      <div
        class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style="height: 80px; transform: translateZ(0px);"
      >
        <SVGDivider
          svgViewBox="0 0 2560 150"
          svgClass="absolute bottom-0 overflow-hidden"
          points="2560 0 2560 100 0 200 0 150"
          polyClass="text-red-800 fill-current"
          polyTransform="translate(0, -10)"
        />
        <SVGDivider
          svgViewBox="0 0 2560 100"
          svgClass="absolute bottom-0 overflow-hidden"
          points="2560 0 2560 200 0 100"
          polyClass="text-white fill-current"
          polyTransform="translate(0, 2)"
        />
      </div>

      <section class="mt-2 pb-8">
        <div
          class="container mx-auto px-4 md:px-0 videoGrid max-w-full md:max-w-3xl lg:max-w-4xl"
        >
          <div
            class="videoSection border-4 border-red-700 border-solid my-12 z-30"
          >
            <div
              class="h-full flex justify-center items-center bg-black"
              v-if="!videoLoaded"
            >
              <img
                src="/img/wayne_warriors_logo.png"
                alt="Wayne Warriors Logo"
              />
            </div>

            <video-embed
              :src="currentVideo.video_url"
              style="height: 100%"
              :height="currentVideo.height"
              :width="currentVideo.width"
            ></video-embed>

            <div
              class="videoTitle my-4 text-center patua-one text-3xl text-shadow text-red-600 antialiased"
              v-html="currentVideo.title"
            ></div>
          </div>

          <LoadingSpinner
            v-if="loading"
            class="mt-32"
            size="big"
            :line-size="8"
            :speed="1"
            message="Loading Videos..."
          />

          <div
            v-else
            class="container videoList mt-24 mb-20 p-2 shadow-lg gallery-bg flex flex-wrap justify-center z-20"
          >
            <div
              v-for="video in videoList"
              :key="video.id"
              class="w-6/12 md:w-6/12 lg:w-4/12 px-3 py-3 video-item"
            >
              <a @click="loadVideo(video)">
                <div
                  :id="'video-' + video.id"
                  class="relative text-white w-4/12 shadow-2xl p-2 bg-contain bg-no-repeat bg-top hover:border-red-800 border-8 border-white video-item w-full cursor-pointer bg-black"
                  :style="{
                    'min-height': '200px',
                    'background-image': 'url(' + video.featured_media_url + ')'
                  }"
                >
                  <div
                    class="w-full absolute bottom-0 -ml-2 gallery-card bg-white  text-center"
                  >
                    <span
                      class="text-md text-gray-800 open-sans font-semibold antialiased"
                      v-html="video.title"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import SVGDivider from "@/components/SVGDivider.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import api from "@/wp-api";

export default {
  name: "Videos",
  components: {
    CustomHeader,
    SVGDivider,
    LoadingSpinner
  },
  data() {
    return {
      currentVideo: {
        title: "",
        url: ""
      },
      videoListSlug: "video-list",
      videoList: [],
      videoLoaded: false,
      loading: true
    };
  },
  methods: {
    async getVideoList(tags = [], per_page = 100, order = "desc") {
      const results = await api.getVideos(tags, per_page, order);
      return results;
    },
    async fetchMedia(id) {
      return await api.getMedia(id);
    },
    loadVideo(video) {
      this.currentVideo = video;
      this.videoLoaded = true;
      window.scrollTo(0, 250);
    }
  },
  async created() {
    this.videoList = await this.getVideoList([], 100, "desc");

    this.videoList.forEach(async video => {
      if (video.featured_media != 0) {
        video.featured_media_url = (
          await this.fetchMedia(video.featured_media)
        ).sizes.medium.source_url;
        document
          .getElementById(`video-${video.id}`)
          .classList.remove("bg-contain", "bg-top");
        document
          .getElementById(`video-${video.id}`)
          .classList.add("bg-cover", "bg-center");
      } else {
        video.featured_media_url = "/img/wayne_warriors_logo_medium.png";
      }
      document.getElementById(
        `video-${video.id}`
      ).style.backgroundImage = `url('${video.featured_media_url}')`;
    });

    this.loading = false;
  }
};
</script>

<style lang="scss">
.text-shadow {
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.9);
}

.videoGrid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(3fr, 460px) 100px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.videoSection {
  grid-area: 1 / 1 / 4 / 3;
  box-shadow: 10px 10px 10px -5px rgba(0, 0, 0, 1);
  margin-bottom: 20px;
  min-height: 460px;
  & iframe {
    min-width: 100%;
    min-height: 100%;
  }
}
.videoTitle {
  grid-area: 4 / 1 / 5 / 3;
  min-height: 50px;
}
.videoList {
  grid-area: 5 / 1 / 6 / 3;
  height: auto;
}

.maxHeightView {
  max-height: calc(100vh - 65px);
}
.maxHeightDefault {
  max-height: 460px;
}

.gallery-bg {
  background: #a0aec0;
  background: linear-gradient(130deg, #a0aec0 0%, #4a5568 50%, #2d3748 100%);
}

.gallery-card {
  height: 3.25rem;
}
@media (max-width: 640px) {
  .gallery-card {
    height: 3rem;
  }
}
@media (max-width: 500px) {
  .video-item {
    width: 100%;
  }
}
</style>
