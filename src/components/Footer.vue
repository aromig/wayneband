<template>
  <footer
    class="relative bg-gray-300 pt-8 pb-6 z-50 bg-no-repeat bg-left-top"
    style="background-image: url('/img/trombone_silhouette.svg')"
  >
    <div
      class="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 upward-shadow z-20"
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
      class="container mx-auto w-11/12 p-4 rounded-lg"
      style="background-color: rgba(0, 0, 0, .1)"
    >
      <div class="flex flex-wrap sm:flex-no-wrap md:flex-row-reverse w-full">
        <div class="w-full flex flex-col sm:flex-row mx-0 shadow-xl">
          <div
            class="w-full sm:w-8/12 px-4 py-2 rounded-t-lg sm:rounded-tr-none md:rounded-l-lg"
            style="background-color: rgba(255, 255, 255, .75)"
          >
            <span
              class="block uppercase text-red-700 text-sm font-semibold mb-2"
              >Upcoming Events</span
            >
            <ul class="list-unstyled text-sm text-gray-700 font-semibold">
              <li v-for="event in events" :key="event.id" class="pb-2">
                <router-link
                  :to="'/events/' + event.slug"
                  v-html="event.event_date_title"
                />
              </li>
            </ul>
            <router-link
              class="text-gray-700 hover:text-red-800 font-semibold block pb-2 text-lg"
              to="/events"
              ><i class="fas fa-calendar-alt text-lg"></i> More
              Events</router-link
            >
          </div>
          <div
            class="w-full sm:w-4/12 py-2 rounded-b-lg sm:rounded-bl-none md:rounded-r-lg"
            style="background-color: rgba(255, 255, 255, .75)"
          >
            <div class="flex flex-wrap items-top mb-2">
              <div class="w-full lg:w-10/12 px-2 ml-auto">
                <span
                  class="block uppercase text-red-700 text-sm font-semibold mb-2"
                  >Resources</span
                >
                <ul class="list-unstyled">
                  <li>
                    <a
                      class="text-gray-700 hover:text-red-800 font-semibold block pb-2 text-lg"
                      href="https://www.facebook.com/groups/WayneMusicClub/"
                      target="_blank"
                      ><i class="fab fa-facebook-square text-lg"></i> Discuss</a
                    >
                  </li>
                  <li>
                    <a
                      class="text-gray-700 hover:text-red-800 font-semibold block pb-2 text-lg"
                      href="https://paypal.me/WayneMusicClub"
                      target="_blank"
                      ><i class="fab fa-paypal text-lg"></i> Pay Fees</a
                    >
                  </li>
                  <li>
                    <router-link
                      class="text-gray-700 hover:text-red-800 font-semibold block pb-2 text-lg"
                      to="/drumbeat"
                      ><i class="fas fa-drum text-lg"></i> Drumbeat</router-link
                    >
                  </li>
                  <li>
                    <a
                      class="text-gray-700 hover:text-red-800 font-semibold block pb-2 text-lg"
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
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-gray-600 font-semibold py-1">
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
