<template>
  <main class="relative bg-gray-100 pt-8">
    <div
      class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
      style="height: 80px; transform: translateZ(0px)"
    >
      <SVGDivider
        svgViewBox="0 0 2560 150"
        svgClass="absolute bottom-0 overflow-hidden"
        points="2560 0 2560 200 0 200 0 150"
        polyClass="text-red-800 fill-current"
        polyTransform="translate(0, -10)"
      />

      <SVGDivider
        svgViewBox="0 0 2560 100"
        svgClass="absolute bottom-0 overflow-hidden"
        points="2560 0 2560 200 0 100"
        polyClass="text-gray-100 fill-current"
        polyTransform="translate(0, 2)"
      />
    </div>

    <!-- Cards -->
    <section class="pb-0">
      <div class="container mx-auto px-4 md:px-0">
        <div class="flex flex-wrap md:-mt-24 z-50">
          <!-- About -->
          <div class="w-full md:w-4/12 px-4 text-center md:mt-16 my-4 md:px-4 ">
            <div class="relative flex flex-col min-w-0 break-words w-full pb-6">
              <router-link to="/about">
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-red-700 hover:bg-red-600"
                  >
                    <i class="fas fa-info text-5xl"></i>
                  </div>
                  <h6 class="text-2xl font-semibold text-gray-700">
                    About
                  </h6>
                  <p class="text-xl mt-2 mb-4 text-gray-600 hover:text-red-500">
                    Our organization and band programs.
                  </p>
                </div>
              </router-link>
              <span class="pages">
                <router-link to="/contact" class="text-xl"
                  >Contact WMC Staff &amp; Board</router-link
                >
              </span>
            </div>
          </div>

          <!-- Announcements -->
          <div class="w-full md:w-4/12 px-4 text-center my-4 md:my-0 md:mt-3">
            <div class="relative flex flex-col min-w-0 break-words w-full">
              <router-link to="/announcements">
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-blue-800 hover:bg-blue-500"
                  >
                    <i class="fas fa-bullhorn text-5xl"></i>
                  </div>
                  <h6 class="text-2xl font-semibold text-gray-700">
                    Announcements
                  </h6>
                  <p class="text-xl mt-2 mb-4 text-gray-600">
                    Latest news regarding concerts, performances, fundraisers,
                    and other information.
                  </p>
                  <ul class="mt-2 mb-4 text-red-800 pages text-xl ">
                    <li
                      v-for="announcement in announcements"
                      :key="announcement.id"
                    >
                      <router-link
                        :to="announcement.path"
                        class="hover:text-red-500"
                        >{{ announcement.title }}</router-link
                      >
                    </li>
                  </ul>
                </div>
              </router-link>
            </div>
          </div>

          <!-- Docs -->
          <div class="w-full md:w-4/12 px-4 text-center y-4 md:mb-0 md:-mt-6">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-4">
              <div class="px-4 py-5 flex-auto">
                <div
                  class="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-green-800 hover:bg-green-500"
                >
                  <i class="fas fa-clipboard text-5xl"></i>
                </div>
                <h6 class="text-2xl font-semibold text-gray-700">
                  Important Documents
                </h6>
                <ul class="text-xl mt-2 mb-4 text-red-800 pages">
                  <li v-for="doc in docs" :key="doc.id">
                    <router-link :to="doc.path" class="hover:text-red-500">{{
                      doc.title
                    }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Posts -->
    <section
      id="recent-posts"
      class="container max-w-full md:px-12 lg:px-24 bg-black bg-fixed bg-center bg-cover"
      :style="{
        'background-image': currentImage
      }"
    >
      <div>
        <div id="post-backgroundImage" class="w-full h-full"></div>
      </div>

      <SVGDivider
        svgClass="overflow-hidden absolute left-0 z-10"
        svgStyle=""
        svgViewBox="0 0 2560 100"
        points="0 0 2560 0 0 100"
        polyClass="text-gray-100 fill-current"
        polyStyle="box-shadow: inset 0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      />

      <PostList class="bg-white text-gray-800" />
    </section>
  </main>
</template>

<script>
import SVGDivider from "@/components/SVGDivider.vue";
import PostList from "@/components/PostList.vue";

import api from "@/wp-api";
import wmc from "@/wmc";

export default {
  name: "HomeContent",
  components: {
    SVGDivider,
    PostList
  },
  data() {
    return {
      bgImages: null,
      currentImage: null,
      docs: [],
      announcements: []
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

    async fetchPosts(page = 1, per_page = 10) {
      let results = await api.getPosts(page, per_page);
      return [results.data, +results.total];
    },

    async fetchPagesByParentId(parent_id) {
      let results = await api.getPages(parent_id);
      return results.data;
    },

    date_formatted(post_date) {
      return wmc.formatDate(post_date);
    }
  },
  async created() {
    this.announcements = await this.fetchPagesByParentId(490);
    this.docs = await this.fetchPagesByParentId(4725);

    this.initBackgroundImages();
  }
};
</script>

<style lang="scss" scoped>
$link_color: #c53030;
$link_color_hover: #f56565;

#recent-posts {
  transition: background-image 1s linear;
}

.pages a {
  color: $link_color;
  &:hover {
    color: $link_color_hover;
    text-decoration: underline;
  }
}

#post-backgroundImage {
  height: 100%;
  width: 100%;
  transition: background-image 1s linear;
}

.colorOverlay {
  background: linear-gradient(160deg, #000000 60%, #c53030);
}

@keyframes fadeOutIn {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 100%;
  }
}
</style>
