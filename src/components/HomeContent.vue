<template>
  <main class="relative pt-8 bg-gray-100">
    <HeaderDivider />

    <!-- Cards -->
    <section class="pb-0">
      <div class="container px-4 mx-auto md:px-0">
        <div class="z-50 flex flex-wrap md:-mt-24">
          <!-- About -->
          <div class="w-full px-4 my-4 text-center md:w-4/12 md:mt-16 md:px-4">
            <div class="relative flex flex-col w-full min-w-0 pb-6 break-words">
              <router-link to="/about">
                <div class="flex-auto px-4 py-5">
                  <div
                    class="inline-flex items-center justify-center w-20 h-20 p-3 mb-5 text-center text-white bg-red-700 rounded-full shadow-lg hover:bg-red-600"
                  >
                    <i class="text-5xl fas fa-info"></i>
                  </div>
                  <h6 class="text-2xl font-semibold text-gray-700">About</h6>
                  <p class="mt-2 mb-4 text-xl text-gray-600 hover:text-red-500">
                    Our organization and band programs.
                  </p>
                </div>
              </router-link>
              <ul class="mb-4 text-xl text-red-800 pages">
                <li
                  v-for="aboutPage in aboutPages"
                  :key="aboutPage.id"
                  class="m-0 list-none"
                >
                  <router-link
                    :to="aboutPage.path"
                    class="hover:text-red-500 md:text-sm lg:text-lg"
                  >
                    {{ aboutPage.title }}</router-link
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- Announcements -->
          <div class="w-full px-4 my-4 text-center md:w-4/12 md:my-0 md:mt-3">
            <div class="relative flex flex-col w-full min-w-0 break-words">
              <router-link to="/announcements">
                <div class="flex-auto px-4 py-5">
                  <div
                    class="inline-flex items-center justify-center w-20 h-20 p-3 mb-5 text-center text-white bg-blue-800 rounded-full shadow-lg hover:bg-blue-500"
                  >
                    <i class="text-5xl fas fa-bullhorn"></i>
                  </div>
                  <h6 class="text-2xl font-semibold text-gray-700">
                    Announcements
                  </h6>
                  <p class="mt-2 mb-4 text-xl text-gray-600 hover:text-red-500">
                    Latest news regarding concerts, performances, fundraisers,
                    and other information.
                  </p>
                  <ul class="mt-2 mb-4 text-xl text-red-800 pages">
                    <li
                      v-for="announcement in announcements"
                      :key="announcement.id"
                      class="m-0 list-none"
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
          <div class="w-full px-4 text-center md:w-4/12 y-4 md:mb-0 md:-mt-6">
            <div class="relative flex flex-col w-full min-w-0 mb-4 break-words">
              <div class="flex-auto px-4 py-5">
                <div
                  class="inline-flex items-center justify-center w-20 h-20 p-3 mb-5 text-center text-white bg-green-800 rounded-full shadow-lg hover:bg-green-500"
                >
                  <i class="text-5xl fas fa-clipboard"></i>
                </div>
                <h6 class="text-2xl font-semibold text-gray-700">
                  Important Documents
                </h6>
                <ul class="mt-2 mb-4 text-xl text-red-800 pages">
                  <li v-for="doc in docs" :key="doc.id" class="m-0 list-none">
                    <router-link
                      :to="doc.path"
                      class="hover:text-red-500 md:text-sm lg:text-lg"
                    >
                      {{ doc.title }}
                    </router-link>
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
      class="container max-w-full bg-fixed bg-black bg-center bg-cover md:px-12 lg:px-24"
      :style="{
        'background-image': currentImage
      }"
    >
      <div>
        <div id="post-backgroundImage" class="w-full h-full"></div>
      </div>

      <SVGDivider
        svgClass="overflow-hidden absolute left-0 z-10"
        svgStyle="margin: -2px"
        svgViewBox="0 0 2560 100"
        points="0 0 2560 0 0 100"
        polyClass="text-gray-100 fill-current"
        polyStyle="box-shadow: inset 0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      />

      <PostList class="text-gray-800 bg-white" />
    </section>
  </main>
</template>

<script>
import HeaderDivider from "@/components/HeaderDivider.vue";
import SVGDivider from "@/components/SVGDivider.vue";
import PostList from "@/components/PostList.vue";

import api from "@/wp-api";
import wmc from "@/wmc";

export default {
  name: "HomeContent",
  components: {
    HeaderDivider,
    SVGDivider,
    PostList
  },
  data() {
    return {
      bgImages: null,
      currentImage: null,
      docs: [],
      announcements: [],
      aboutPages: []
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
      return results.data.sort((a, b) => a.title > b.title);
    },

    date_formatted(post_date) {
      return wmc.formatDate(post_date);
    }
  },
  async created() {
    this.announcements = await this.fetchPagesByParentId(490);
    this.docs = await this.fetchPagesByParentId(4725);
    this.aboutPages = await this.fetchPagesByParentId(11);

    this.initBackgroundImages();
  }
};
</script>

<style lang="scss" scoped>
#recent-posts {
  transition: background-image 1s linear;
}

.pages {
  a {
    color: $link_color;
    &:hover {
      color: $link_color_hover;
      text-decoration: underline;
    }
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
