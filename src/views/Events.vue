<template>
  <div class="bg-white">
    <custom-header id="header" page-title="Events &amp; Schedule" />

    <main id="main-body" class="relative pt-8 mb-12 bg-white">
      <HeaderDivider class="no-print" />
      <div class="flex flex-col flex-wrap w-10/12 mx-auto md:flex-row">
        <div class="flex-1 max-w-full md:max-w-xs" id="eventsCalendar">
          <Calendar
            id="calendar"
            class="mx-auto md:fixed"
            :loadMonth="today.month"
            :loadYear="today.year"
            @monthChange="onMonthChanged"
          />
        </div>
        <section id="events" class="flex-1 p-2 ml-0 sm:ml-8 open-sans text-md">
          <LoadingSpinner
            v-if="loadingEvents"
            class="mx-auto"
            size="big"
            :line-size="8"
            :speed="0.5"
          />
          <ul id="eventList" v-else class="text-sm">
            <li
              v-for="event in events"
              :key="event.id"
              :id="'event-' + event.id"
              class="flex flex-row w-full mb-2 border-t-2 events"
            >
              <div
                class="text-2xl font-semibold text-gray-600 event_date open-sans"
              >{{ event.event_short_date }}</div>
              <div>
                <router-link :to="'/events/' + event.slug">
                  <span class="block mt-1 text-lg" v-html="event.title" />
                </router-link>
                <span class="block text-sm font-semibold text-gray-500">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ event.event_location_name }}
                  <span
                    v-if="event.event_time"
                    class="block lg:inline"
                  >
                    <i class="fas fa-clock"></i>
                    {{ event.event_time }}
                  </span>
                </span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import HeaderDivider from "@/components/HeaderDivider.vue";
import Calendar from "@/components/Calendar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import api from "@/wp-api";
import wmc from "@/wmc";
import { EventBus } from "@/event-bus";

export default {
  name: "EventList",
  components: {
    CustomHeader,
    HeaderDivider,
    Calendar,
    LoadingSpinner
  },
  data() {
    return {
      events: [],
      prevMonthsEvents: [],
      nextMonthsEvents: [],
      totalEvents: 0,
      month: {},
      today: {},
      loadingEvents: false
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
          event_time: event.event_time_end
            ? `${event.event_time_start} to ${event.event_time_end}`
            : `${event.event_time_start}`,
          event_time_start: event.event_time_start,
          event_time_end: event.event_time_end,
          event_location_name: event.event_location_name,
          event_location: event.event_location,
          event_short_date: `${wmc.formatDate(event.event_date, "shortest")}`,
          event_date_title: `${wmc.formatDate(event.event_date, "short")} ${
            event.title
          }`
        };
      });
      return events;
    },
    async loadEvents(month, year, days) {
      return (await this.getEventList(1, 100, "desc"))
        .filter(event => {
          const eventDate = new Date(event.event_date);
          const thisMonthStart = new Date(`${month}/1/${year}`);
          const thisMonthEnd = new Date(`${month}/${days}/${year}`);
          return eventDate >= thisMonthStart && eventDate <= thisMonthEnd;
        })
        .sort((a, b) => {
          const a_timestamp = new Date(`${a.event_date} ${a.event_time_start}`);
          const b_timestamp = new Date(`${b.event_date} ${b.event_time_start}`);

          return a_timestamp - b_timestamp;
        });
    },
    async onMonthChanged(newMonth) {
      this.events =
        newMonth.num > this.month.num
          ? this.nextMonthsEvents
          : this.prevMonthsEvents;
      this.month = newMonth;
      this.events = await this.loadEvents(
        this.month.num,
        this.month.year,
        this.month.days
      );
      this.highlightEvents();

      this.nextMonthsEvents = await this.loadNextMonthsEvents(this.month);
      this.prevMonthsEvents = await this.loadPrevMonthsEvents(this.month);
    },
    highlightEvents() {
      this.events.forEach(event => {
        EventBus.$emit("highlight-event-date", event.event_date);
        EventBus.$emit("add-date-click", event);
      });
      if (this.month.num == this.today.month) {
        EventBus.$emit(
          "highlight-today",
          `${this.today.month}/${this.today.day}/${this.today.year}`
        );
      }
    },
    getDaysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },
    async loadNextMonthsEvents(month) {
      const nextMonth = month.num < 12 ? month.num + 1 : 1;
      const nextMonthsYear = month.num < 12 ? month.year : month.year + 1;
      return await this.loadEvents(
        nextMonth,
        nextMonthsYear,
        this.getDaysInMonth(nextMonthsYear, nextMonth)
      );
    },
    async loadPrevMonthsEvents(month) {
      const prevMonth = month.num > 1 ? month.num - 1 : 12;
      const prevMonthsYear = month > 1 ? month.year : month.year - 1;
      return await this.loadEvents(
        prevMonth,
        prevMonthsYear,
        this.getDaysInMonth(prevMonthsYear, prevMonth)
      );
    },
    handleScroll() {
      const eventsCalendar = document.getElementById("eventsCalendar");
      const calendar = document.getElementById("calendar");

      const maxScrollTo = eventsCalendar.scrollHeight - calendar.clientHeight;

      if (document.querySelector("html").offsetWidth >= 752) {
        if (maxScrollTo <= window.scrollY) {
          calendar.classList.add("stick_to_bottom");
        } else {
          calendar.classList.remove("stick_to_bottom");
        }
      } else {
        calendar.classList.remove("stick_to_bottom");
      }
    }
  },
  created() {
    const today = new Date();
    this.today = {
      month: today.getMonth() + 1,
      day: today.getDate(),
      year: today.getFullYear()
    };

    this.month = {
      num: today.getMonth() + 1,
      year: today.getFullYear(),
      days: new Date(this.today.year, this.today.month, 0).getDate()
    };
  },
  async mounted() {
    // Load currently shown month's events
    this.loadingEvents = true;
    this.events = await this.loadEvents(
      this.month.num,
      this.month.year,
      this.month.days
    );
    this.totalEvents = this.events.length;
    this.loadingEvents = false;
    this.highlightEvents();

    // Lazy load next month's events
    this.nextMonthsEvents = await this.loadNextMonthsEvents(this.month);

    // Lazy load previous month's events
    this.prevMonthsEvents = await this.loadPrevMonthsEvents(this.month);

    window.addEventListener("resize", () => {
      window.removeEventListener("scroll", this.handleScroll);

      if (document.querySelector("html").offsetWidth >= 752) {
        window.addEventListener("scroll", this.handleScroll);
      } else {
        document.getElementById("calendar").classList.remove("stick_to_bottom");
      }
    });

    window.addEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.event_date {
  min-width: 6rem;
}

.events a {
  color: $link_color;
  &:hover {
    color: $link_color_hover;
    text-decoration: underline;
  }
}

#main-body {
  min-height: 325px;
}

.stick_to_bottom {
  position: absolute;
  bottom: 14px;
}
</style>
