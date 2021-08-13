<template>
  <div class="bg-white">
    <custom-header page-title="Volunteer" />

    <main class="relative pt-8 pb-12 bg-white">
      <HeaderDivider class="no-print" />
      <article class="w-10/12 py-4 mx-auto text-gray-900">
        <h2>Current Volunteer Opportunities</h2>
        <ul v-for="signup in signup_list" :key="signup.id">
          <li>
            <a :href="signup.signup_link" target="_blank" class="signup_link">{{
              signup.title
            }}</a>
            <span class="text-sm">
              - {{ getLongDateFormat(signup.signup_date) }}
            </span>
            <sup
              v-if="signup.categories.includes(concession_cat.id)"
              class="concessions_cat"
              >Concessions</sup
            >
            <sup
              v-if="signup.categories.includes(fundraising_cat.id)"
              class="fundraising_cat"
              >Fundraising</sup
            >
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import HeaderDivider from "@/components/HeaderDivider.vue";

import api from "@/wp-api";
import wmc from "@/wmc";

export default {
  name: "Volunteer",
  components: {
    CustomHeader,
    HeaderDivider,
  },
  data() {
    return {
      signup_list: null,
      concession_cat: null,
      fundraising_cat: null,
    };
  },
  methods: {
    getLongDateFormat(datestring) {
      let options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options).format(
        new Date(datestring)
      );
    },
    async getCurrentSignupList() {
      let results = await api.getSignUpEvents();
      return results.data
        .filter(
          (signup) =>
            wmc.formatDate(signup.signup_date, "short") >=
            wmc.formatDate(new Date(), "short")
        )
        .sort((a, b) => new Date(a.signup_date) - new Date(b.signup_date));
    },
    async getPastSignUpList() {
      let results = await api.getSignUpEvents();
      return results.data.filter(
        (signup) => signup.signup_date < wmc.formatDate(new Date())
      );
    },
  },
  async mounted() {
    this.concession_cat = await api.getCategory("Concessions");
    this.fundraising_cat = await api.getCategory("Fundraising");
    this.signup_list = await this.getCurrentSignupList();
  },
};
</script>

<style lang="scss">
sup {
  color: #fff;
  font-weight: 500;
  font-size: 0.6em;
  padding: 0.25em;
  border-radius: 5px;
  margin-left: 5px;
}
.concessions_cat {
  background-color: $red-800;
}
.fundraising_cat {
  background-color: $green-600;
}
</style>
