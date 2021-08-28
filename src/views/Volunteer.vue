<template>
  <div class="bg-white">
    <custom-header page-title="Volunteer" />

    <main class="relative pt-8 pb-12 bg-white">
      <HeaderDivider class="no-print" />
      <article class="w-10/12 py-4 mx-auto text-gray-900">
        <h2>Current Volunteer Opportunities</h2>
        <ul>
          <li v-for="signup in signup_list" :key="signup.id">
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
        <hr class="mt-5 border-red-600" />

        <h2>Check Concession Requirements</h2>

        <p>
          Check which requirements a student has met this season in the table
          below. This list is updated periodically as we review the concession
          sign-up sheets from each game. If the student is a senior, they are
          excused from the varsity football requirement. Be sure to review the
          <a href="/concessions">Concessions</a> page for more details if you
          have not already.
        </p>

        <input
          id="search"
          type="text"
          class="border-gray-500 border-2 w-3/12 px-2 mb-4"
          placeholder="Filter list by first name..."
          v-model="table_search"
          @keyup="searchTable"
        />

        <table id="concessions_credit">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>Varsity FB</th>
              <th>Varsity FB</th>
              <th>Halftime USA</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in sheet"
              :key="row._rowNumber"
              :id="'row__' + row._rowNumber"
            >
              <td>{{ row["First Name"] }}</td>
              <td>{{ row["Last Name"] }}</td>
              <td>{{ row["1"] }}</td>
              <td>{{ row["2"] }}</td>
              <td>{{ row["3"] }}</td>
              <td>{{ row["4"] }}</td>
              <td>{{ row["5"] }}</td>
              <td>{{ row["Varsity FB 1"] }}</td>
              <td>{{ row["Varisty FB 2"] }}</td>
              <td>{{ row["halftime"] }}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import HeaderDivider from "@/components/HeaderDivider.vue";

import api from "@/wp-api";
import wmc from "@/wmc";
import googleApi from "@/google-api";
const { GoogleSpreadsheet } = require("google-spreadsheet");

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
      spreadsheet_id: "",
      sheet: null,
      table_search: "",
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
    async getSpreadsheet(sheet_id) {
      const doc = new GoogleSpreadsheet(sheet_id);
      await doc.useApiKey(googleApi.sheetsApiKey);
      await doc.loadInfo();
      return await doc.sheetsByIndex[0].getRows();
    },
    searchTable() {
      var filter, table, tr, td, i, txtValue;
      filter = this.table_search.toUpperCase();
      table = document.getElementById("concessions_credit");
      tr = table.getElementsByTagName("tr");

      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            table.style.display = "";
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
  },
  async mounted() {
    this.concession_cat = await api.getCategory("Concessions");
    this.fundraising_cat = await api.getCategory("Fundraising");
    this.signup_list = await this.getCurrentSignupList();
    this.spreadsheet_id = (
      await api.getCustomOption("concession_credits_google_sheet_id")
    ).value;
    this.sheet = await this.getSpreadsheet(this.spreadsheet_id);
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

#concessions_credit {
  max-width: -moz-fit-content;
  max-width: fit-content;
  overflow-x: auto;
  white-space: nowrap;
  border-collapse: collapse;
  min-width: 100%;
  thead {
    border-bottom: 2px solid #333;
  }
  tbody > :nth-child(even) {
    background-color: #eee;
  }
  tr {
    display: grid;
    min-width: 100%;
    grid-template-columns:
      125px 100px
      repeat(5, 50px)
      repeat(3, 100px);
    :nth-child(N + 3) {
      text-align: center;
    }
    th,
    td {
      min-width: 50px;
    }
  }
}
</style>
