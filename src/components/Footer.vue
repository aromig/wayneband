<template>
  <footer
    class="relative z-50 pt-8 pb-6 bg-gray-300 bg-left-top bg-no-repeat"
    style="background-image: url('/img/trombone_silhouette.svg')"
  >
    <div
      class="absolute top-0 left-0 right-0 bottom-auto z-20 w-full -mt-20 overflow-hidden pointer-events-none upward-shadow"
      style="height: 80px; transform: translateZ(0px);"
    >
      <SVGDivider
        svgViewBox="0 0 2560 150"
        svgClass="absolute bottom-0 overflow-hidden z-50"
        points="2560 0 2560 200 0 200 0 150"
        polyClass="text-red-800 fill-current"
        polyTransform="translate(0, -10)"
      />
      <SVGDivider
        svgViewBox="0 0 2560 100"
        svgClass="absolute bottom-0 overflow-hidden z-50"
        points="2560 0 2560 200 125 100"
        polyClass="text-gray-300 fill-current"
        polyTransform="translate(0, 10)"
      />
    </div>
    <div
      class="container w-11/12 p-4 mx-auto rounded-lg"
      style="background-color: rgba(0, 0, 0, .1)"
    >
      <div class="flex flex-wrap w-full sm:flex-no-wrap md:flex-row-reverse">
        <div class="flex flex-col w-full mx-0 shadow-xl sm:flex-row">
          <div
            class="w-full px-4 py-2 rounded-t-lg sm:w-8/12 sm:rounded-tr-none md:rounded-l-lg"
            style="background-color: rgba(255, 255, 255, .75)"
          >
            <span
              class="block mb-2 text-sm font-semibold text-red-700 uppercase"
              >Upcoming Events</span
            >
            <ul class="text-sm font-semibold text-gray-700 list-unstyled">
              <li v-for="event in events" :key="event.id" class="pb-2">
                <router-link
                  :to="'/events/' + event.slug"
                  v-html="event.event_date_title"
                />
              </li>
            </ul>
            <router-link
              class="block pb-2 text-lg font-semibold text-gray-700 hover:text-red-800"
              to="/events"
              ><i class="text-lg fas fa-calendar-alt"></i> More
              Events</router-link
            >
          </div>
          <div
            class="w-full py-2 rounded-b-lg sm:w-4/12 sm:rounded-bl-none md:rounded-r-lg"
            style="background-color: rgba(255, 255, 255, .75)"
          >
            <div class="flex flex-wrap mb-2 items-top">
              <div class="w-full px-2 ml-auto lg:w-10/12">
                <span
                  class="block mb-2 text-sm font-semibold text-red-700 uppercase"
                  >Resources</span
                >
                <ul class="list-unstyled">
                  <li>
                    <a
                      class="block pb-2 text-lg font-semibold text-gray-700 hover:text-red-800"
                      href="https://www.facebook.com/groups/WayneMusicClub/"
                      target="_blank"
                      ><i class="text-lg fab fa-facebook-square"></i> Discuss</a
                    >
                  </li>
                  <li>
                    <a
                      class="block pb-2 text-lg font-semibold text-gray-700 hover:text-red-800"
                      href="https://paypal.me/WayneMusicClub"
                      target="_blank"
                      ><i class="text-lg fab fa-paypal"></i> Pay Fees</a
                    >
                  </li>
                  <li>
                    <router-link
                      class="block pb-2 text-lg font-semibold text-gray-700 hover:text-red-800"
                      to="/drumbeat"
                      ><i class="text-lg fas fa-drum"></i> Drumbeat</router-link
                    >
                  </li>
                  <li>
                    <a
                      class="block pb-2 text-lg font-semibold text-gray-700 hover:text-red-800"
                      href=""
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 ml-auto border-red-800 md:w-4/6" />
      <div
        class="flex flex-wrap items-center justify-center md:justify-between"
      >
        <div class="w-full px-4 mx-auto text-center md:w-4/12">
          <div class="py-1 text-sm font-semibold text-gray-600">
            Copyright © {{ date }} Wayne Music Club
            <address class="block">
              P.O. Box 24392, Huber Heights, Ohio 45424
            </address>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import SVGDivider from "@/components/SVGDivider.vue";

import api from "@/wp-api";
import wmc from "@/wmc";

export default {
  name: "Footer",
  components: {
    SVGDivider
  },
  data() {
    return {
      date: new Date().getFullYear(),
      events: [],
      totalEvents: 0
    };
  },
  methods: {
    async getEventList(page = 1, per_page = 100, order = "desc") {
      const results = (await api.getEvents(page, per_page, order)).data;
      let events = results.map(event => {
        return {
          id: event.id,
          title: event.title,
          link: event.link,
          slug: event.slug,
          content: event.content,
          event_date: event.event_date,
          event_time: `${event.event_time_start} - ${event.event_time_end}`,
          event_location: event.event_location,
          event_date_title: `${wmc.formatDate(event.event_date, "short")} ${
            event.title
          }`
        };
      });
      return events;
    }
  },
  async created() {
    this.events = (await this.getEventList(1, 50, "desc"))
      .filter(event => {
        const eventDate = new Date(event.event_date);
        const today = new Date();
        const sixMonths = new Date().setMonth(today.getMonth() + 6);

        return eventDate >= today && eventDate <= sixMonths;
      })
      .reverse()
      .slice(0, 5);
    this.totalEvents = this.events.length;
  }
};
</script>

<style lang="scss" scoped>
footer {
  .text-shadow {
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
  }
  box-shadow: 0px -5px 40px 25px rgba(0, 0, 0, 0.7);
  & a {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
