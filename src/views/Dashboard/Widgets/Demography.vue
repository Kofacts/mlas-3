<template>
  <section>
    <div v-if="metrics.total">
      <div class="row">
        <div class="col-sm-3">
          <h6 class="text-small">Total no. of impressionns</h6>
          <h5>{{metrics.total}} impressions</h5>
        </div>
        <div class="col-sm-3">
          <h6 class="text-small">% ratio of response (For Poll)</h6>
          <h5>{{metrics.submitted}}:{{metrics.total}}</h5>
        </div>
      </div>
      <div class="row demography mt-5">
        <div class="col-sm-12">
          <h6 class="text-medium text-opacity">DEMOGRAPHY</h6>
        </div>

        <div class="col-sm-12 col-lg-3 mt-2">
          <h6 class="text-small text-medium">By Country</h6>
          <ul class="demography-countries pt-2">
            <li
              :key="index"
              v-for="(countryData, index) in topCountries.slice(0, 5)"
              v-html="`${countryData.country.emoji} ${countryData.country.name} (${countryData.count})`"
            ></li>
          </ul>
        </div>
        <div class="col-sm-12 col-lg-3 mt-2">
          <h6 class="text-small text-medium">By Devices</h6>
          <ul class="demography-countries pt-2">
            <li>
              <i class="zmdi zmdi-smartphone-android pr-3"></i>
              Mobile - {{parseFloat((metrics.device.is_mobile/metrics.total) * 100).toFixed(2)}} ({{metrics.device.is_mobile}})
            </li>
            <li>
              <i class="zmdi zmdi-laptop-mac pr-2"></i>
              Other Devices - {{parseFloat(((metrics.total - metrics.device.is_mobile)/metrics.total) * 100).toFixed(2)}}% ({{metrics.total - metrics.device.is_mobile}})
            </li>
          </ul>
        </div>
        <div class="col-sm-12 col-lg-3 mt-2">
          <h6 class="text-small text-medium">By Browser Type</h6>
          <ul class="demography-countries pt-2">
            <li :key="index" v-for="(key, value, index) of topBrowsers">
              <span class="pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <path
                    d="M2.897 4.181c2.43-2.828 5.763-4.181 9.072-4.181 4.288 0 8.535 2.273 10.717 6.554-2.722.001-6.984 0-9.293 0-1.674.001-2.755-.037-3.926.579-1.376.724-2.415 2.067-2.777 3.644l-3.793-6.596zm5.11 7.819c0 2.2 1.789 3.99 3.988 3.99s3.988-1.79 3.988-3.99-1.789-3.991-3.988-3.991-3.988 1.791-3.988 3.991zm5.536 5.223c-2.238.666-4.858-.073-6.293-2.549-1.095-1.891-3.989-6.933-5.305-9.225-1.33 2.04-1.945 4.294-1.945 6.507 0 5.448 3.726 10.65 9.673 11.818l3.87-6.551zm2.158-9.214c1.864 1.734 2.271 4.542 1.007 6.719-.951 1.641-3.988 6.766-5.46 9.248 7.189.443 12.752-5.36 12.752-11.972 0-1.313-.22-2.66-.69-3.995h-7.609z"
                  ></path>
                </svg>
              </span>
              {{key[0]}} - {{ parseFloat((key[1]/metrics.total) * 100).toFixed(2) }}% ({{ key[1] }})
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>
      <small>⚡️ You don't have enough entry to help us generate this report, yet. Check back soon 💪</small>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.demography {
  .demography-countries {
    padding: 0;
    list-style-type: none;

    li {
      font-size: 14px;
      padding-top: 4px;
    }
  }
}
</style>
<script>
import moment from "moment";
export default {
  name: "Demography",
  components: {},
  data() {
    return {

    };
  },
  methods: {
    moment
  },
  computed: {
    topCountries() {
      return Object.values(this.metrics.countries);
    },
    topBrowsers() {
      return Object.keys(this.metrics.browsers)
        .map(key => [key, this.metrics.browsers[key]])
        .slice(0, 5);
    },
    metrics() {
      return this.$store.getters['feedbacks/single_metric'];
    }
  },

  created() {
    this.metrics.id == this.$route.params.id || this.$store.dispatch("feedbacks/fetchSingleMetric", this.$route.params.id);
  }
};
</script>
