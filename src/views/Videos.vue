<template>
  <div class="bg-white">
    <custom-header page-title="Performance Videos" />

    <main class="relative pt-2 pb-10 text-gray-800 bg-white">
      <HeaderDivider class="no-print" />

      <section class="pb-8 mt-2">
        <div class="container max-w-full px-4 mx-auto md:px-0 videoGrid md:max-w-3xl lg:max-w-4xl">
          <div class="z-30 my-12 border-4 border-red-700 border-solid videoSection">
            <div class="flex items-center justify-center h-full bg-black" v-if="!videoLoaded">
              <img src="/img/wayne_warriors_logo.png" alt="Wayne Warriors Logo" />
            </div>

            <video-embed
              :src="currentVideo.video_url"
              class="h-full"
              :height="currentVideo.height"
              :width="currentVideo.width"
            ></video-embed>
          </div>

          <div
            class="text-3xl antialiased text-center text-red-600 videoTitle patua-one text-shadow"
            v-html="currentVideo.title"
          ></div>

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
            class="container z-20 flex flex-wrap justify-center p-2 mt-8 mb-20 shadow-lg videoList gallery-bg"
          >
            <div
              v-for="video in videoList"
              :key="video.id"
              class="w-6/12 px-3 py-3 md:w-6/12 lg:w-4/12 video-item"
            >
              <a @click="loadVideo(video)">
                <div
                  :id="'video-' + video.id"
                  class="relative w-4/12 w-full p-2 text-white bg-black bg-top bg-no-repeat bg-contain border-8 border-white shadow-2xl cursor-pointer hover:border-red-800 video-item"
                  :style="{
                    'min-height': '200px',
                    'background-image': 'url(' + video.featured_media_url + ')'
                  }"
                >
                  <div class="absolute bottom-0 w-full -ml-2 text-center bg-white gallery-card">
                    <span
                      class="antialiased font-semibold text-gray-800 text-md open-sans"
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
import HeaderDivider from "@/components/HeaderDivider.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import api from "@/wp-api";

export default {
  name: "Videos",
  components: {
    CustomHeader,
    HeaderDivider,
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
      return results.data;
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

@media only screen and (min-width: 640px) {
  .videoSection > div {
    height: 480px;
  }
}
@media only screen and (max-width: 640px) {
  .videoSection {
    min-height: 240px;
    & > div {
      height: 240px;
    }
  }
}
@media only screen and (max-width: 500px) {
  .video-item {
    width: 100%;
  }
}
</style>
