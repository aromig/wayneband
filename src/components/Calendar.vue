<template>
  <div class="p-2 border-2 shadow-md calendar open-sans">
    <div
      class="flex flex-row flex-no-wrap justify-between w-full pb-2 font-semibold text-center text-gray-600 month-indicator"
    >
      <button class="text-lg hover:text-red-700" @click="previousMonth">
        <i class="fas fa-arrow-alt-circle-left"></i>
      </button>

      <div>{{ monthName }} {{ year }}</div>

      <button class="text-lg hover:text-red-700" @click="nextMonth">
        <i class="fas fa-arrow-alt-circle-right"></i>
      </button>
    </div>
    <div class="text-xs font-semibold text-center day-of-week">
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>
    <div class="text-center date-grid">
      <button
        v-for="index in daysInMonth"
        :key="index"
        :id="'day-' + index"
        class="p-2"
      >
        <time :datetime="month + '/' + index + '/' + year">{{ index }}</time>
      </button>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  name: "Calendar",
  props: {
    loadMonth: Number,
    loadYear: Number
  },
  data() {
    return {
      calMonth: 0,
      calYear: 0,
      day_selected: null
    };
  },
  computed: {
    month() {
      return new Date(`${this.calMonth}/1/${this.calYear}`).getMonth() + 1;
    },
    monthName() {
      return new Date(`${this.calMonth}/1/${this.calYear}`).toLocaleString(
        "default",
        {
          month: "long"
        }
      );
    },
    day() {
      return new Date(
        `${this.calMonth}/${this.day_selected}/${this.calYear}`
      ).getDate();
    },
    year() {
      return new Date(`${this.calMonth}/1/${this.calYear}`).getFullYear();
    },
    daysInMonth() {
      return new Date(this.year, this.month, 0).getDate();
    },
    startsOn() {
      return new Date(`${this.month}/1/${this.year}`).getDay();
    }
  },
  methods: {
    pushDates() {
      document.getElementById("day-1").style.gridColumn = this.startsOn + 1;
    },
    highlightDate(day) {
      document.getElementById(`day-${day}`).classList.add("highlight");
    },
    highlightToday(day) {
      document.getElementById(`day-${day}`).classList.add("today");
    },
    async unhighlightAllDates() {
      const highlighted = document.querySelectorAll(".highlight");
      if (highlighted != null) {
        highlighted.forEach(day => {
          day.classList.remove("highlight");
        });
      }

      const today = document.querySelector(".today");
      if (today != null) today.classList.remove("today");
    },
    /* selectDate(day) {
      document.getElementById(`day-${this.day}`).classList.remove("selected");
      this.date_selected = `${this.month}/${day}/${this.year}`;
    }, */
    async previousMonth() {
      await this.unhighlightAllDates();
      const month = this.calMonth > 1 ? this.calMonth - 1 : 12;
      const year = this.calMonth > 1 ? this.calYear : this.calYear - 1;
      this.calMonth = month;
      this.calYear = year;
    },
    async nextMonth() {
      await this.unhighlightAllDates();
      const month = this.calMonth < 12 ? this.calMonth + 1 : 1;
      const year = this.calMonth < 12 ? this.calYear : this.calYear + 1;
      this.calMonth = month;
      this.calYear = year;
    }
  },
  watch: {
    /* date_selected() {
      this.pushDates();
      // this.highlightDate();
    }, */
    calMonth() {
      this.pushDates();
      this.$emit("monthChange", {
        num: this.calMonth,
        year: this.calYear,
        days: this.daysInMonth
      });
    }
  },
  created() {
    EventBus.$on("highlight-event-date", value => {
      const day = new Date(value).getDate();
      this.highlightDate(day);
    });
    EventBus.$on("highlight-today", value => {
      const day = new Date(value).getDate();
      this.highlightToday(day);
    });
    EventBus.$on("add-date-click", value => {
      const day = Number(value.event_short_date.split("/")[1]);
      document.getElementById(`day-${day}`).addEventListener("click", () => {
        const eventLI = document.getElementById(`event-${value.id}`);
        window.scrollTo(0, eventLI.offsetTop - 40);
      });
    });

    this.calMonth = this.loadMonth;
    this.calyear = this.loadYear;
  },
  mounted() {
    const today = new Date();
    this.calMonth = today.getMonth() + 1;
    this.calYear = today.getFullYear();
    this.pushDates();
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  max-width: max-content;
  max-height: 20rem;
}
.month-indicator button {
  &:active {
    transform: scale(0.9);
  }
}
.day-of-week,
.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  & button {
    border: 1px solid transparent;
    &:hover {
      border-color: #c53030;
      background-color: #feb2b2;
    }
    &.highlight {
      color: #c53030;
      font-weight: bold;
    }
    &.today {
      border: 1px solid #c53030;
    }
  }
}
</style>
