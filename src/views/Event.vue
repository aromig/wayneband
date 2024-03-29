<template>
  <div class="bg-white">
    <custom-header :page-title="event.title" />

    <main class="relative pt-8 pb-12 bg-white">
      <HeaderDivider class="no-print" />
      <section
        :id="'event-' + event.id"
        class="w-10/12 py-4 mx-auto text-gray-900"
      >
        <div
          v-if="featured_media"
          class="mx-auto md:w-6/12 md:float-right md:m-8"
        >
          <img
            :src="featured_media"
            class="border-4 border-red-800 border-solid shadow-lg"
          />
        </div>

        <article
          v-html="event.content"
          id="event-content"
          class="w-full py-4 text-lg break-words lg:1/2 md:pr-12"
        />
      </section>

      <div class="w-9/12 mx-auto lg:w-10/12">
        <div
          class="flex flex-col flex-wrap items-center justify-center w-full mb-6 md:flex-row lg:justify-between"
        >
          <section
            id="event-date-time"
            class="font-semibold shadow-lg text-md card"
          >
            <p>When: {{ formatted_date }}</p>
            <p>
              Time:
              {{ event.event_time_start }}
              <span v-if="event.event_time_end"
                >to {{ event.event_time_end }}</span
              >
            </p>
            <p>
              Where: {{ event.event_location_name }}
              <span
                v-if="
                  event.event_full_address !=
                    'undefined undefined, undefined, undefined'
                "
              >
                <br />
                {{ event.event_full_address }}
              </span>
            </p>
            <p v-if="event.related_link">
              For more information, please see:
              <a
                :href="event.related_link"
                class="hover:text-red-500 open-sans"
                target="_blank"
                >{{ event.related_link }}</a
              >
            </p>
          </section>

          <google-map-embed
            v-if="event.event_location"
            :src_url="event.event_map_url"
            class="justify-end w-full h-64 mt-8 border-2 border-red-800 border-solid shadow-lg lg:w-1/2 lg:mt-0"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import HeaderDivider from "@/components/HeaderDivider.vue";
import GoogleMapEmbed from "@/components/GoogleMapEmbed.vue";

import api from "@/wp-api";
import wmc from "@/wmc";

export default {
  name: "Event",
  components: {
    CustomHeader,
    HeaderDivider,
    GoogleMapEmbed,
  },
  data() {
    return {
      event: {},
      featured_media: "",
      formatted_date: "",
    };
  },
  methods: {
    dateToString(post_date) {
      return wmc.formatDate(post_date);
    },
    async fetchData(event_slug) {
      return await api.getEvent(event_slug);
    },
    async fetchMedia(id) {
      return await api.getMedia(id);
    },
  },
  watch: {
    event() {
      this.formatted_date = this.dateToString(this.event.event_date);
    },
  },
  async created() {
    this.event = await this.fetchData(this.$route.params.slug);
    if (this.event.featured_media != 0) {
      this.featured_media = (
        await this.fetchMedia(this.event.featured_media)
      ).sizes.full.source_url;
    }
    document.title = `${this.event.title} - ${this.$route.meta.title}`;
  },

  beforeRouteUpdate(to, from, next) {
    this.slug = to.params.slug;
    next();
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-width: 2px;
  padding: 2rem;
}
</style>
