<template>
  <div class="bg-white">
    <custom-header :page-title="event.title" />

    <main class="relative bg-white pt-8 pb-12">
      <div
        class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style="height: 80px; transform: translateZ(0px);"
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
          polyClass="text-white fill-current"
          polyTransform="translate(0, 10)"
        />
      </div>
      <div
        :id="'event-' + event.id"
        class="py-4 w-9/12 lg:w-10/12 mx-auto text-gray-900"
      >
        <img
          v-if="featured_media"
          :src="featured_media"
          class="w-full lg:max-w-xl mx-auto mb-6 float-right rounded-lg"
        />

        <article
          v-html="event.content"
          id="event-content"
          class="py-4 break-words text-lg list-none"
        />

        <div
          class="flex md:flex-row flex-col flex-wrap justify-between w-full mb-6"
        >
          <section
            id="event-date-time"
            class="text-md font-semibold card shadow-lg"
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
              Where: {{ event.event_location_name }}<br />{{
                event.event_full_address
              }}
            </p>
            <p v-if="event.related_link">More Info: {{ event.related_link }}</p>
          </section>

          <google-map-embed
            v-if="event.event_location"
            :src_url="event.event_map_url"
            class="justify-end border-2 border-solid border-red-800 w-full h-64 lg:w-1/2 mt-8 lg:mt-0 shadow-lg"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import SVGDivider from "@/components/SVGDivider.vue";
import GoogleMapEmbed from "@/components/GoogleMapEmbed.vue";

import api from "@/wp-api";
import wmc from "@/wmc";

export default {
  name: "Event",
  components: {
    CustomHeader,
    SVGDivider,
    GoogleMapEmbed
  },
  data() {
    return {
      event: {},
      featured_media: "",
      formatted_date: ""
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
    }
  },
  watch: {
    event() {
      this.formatted_date = this.dateToString(this.event.event_date);
    }
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
  }
};
</script>

<style lang="scss" scoped>
$link_color: #c53030;
$link_color_hover: #f56565;
$text-gray-700: #4a5568;

.text-shadow {
  text-shadow: 3px 3px 3px #000;
}

#event-content {
  & h1,
  h2,
  h3 {
    font-family: "Open Sans";
  }
  & article {
    font-size: 1.25em;
  }
  & .wp-block-group,
  .wp-block-image {
    display: block;
  }
  & .img-center img {
    display: block;
    margin: 0 auto;
  }
  & h2 {
    font-size: 1.5rem;
    margin: 1.5rem 0;
    color: #c53030;
  }
  & h3 {
    font-size: 1.5rem;
  }
  & p {
    margin: 1rem 0;
    &.signup_link {
      margin-left: 1rem;
      &:before {
        color: $link_color;
        content: "\f14b\00a0";
        font-family: "Font Awesome 5 Free";
        font-size: 1.5rem;
        display: inline-block;
        padding-right: 3px;
        vertical-align: middle;
        font-weight: 900;
      }
    }
  }
  & .has-text-align-center {
    text-align: center;

    & strong {
      color: #c53030;
    }
  }
  & a {
    color: $link_color;
    &:hover {
      color: $link_color_hover;
      text-decoration: underline;
    }
  }
  & hr.wp-block-separator {
    margin: 0.5rem;
    border: 1px solid #f53030;
  }
}

.wp-block-embed__wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.wp-block-embed__wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card {
  border-width: 2px;
  padding: 2rem;
}
</style>
