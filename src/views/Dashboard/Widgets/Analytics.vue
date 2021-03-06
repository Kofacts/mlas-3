<template>
  <section>
    <div class="row">
      <div class="col-sm-12 col-lg-8">
        <analytics
          v-if="widget.name && metrics.months && metrics.total > 0"
          :name="widget.name"
          :description="widget.description"
          :labels="Object.keys(metrics.months)"
          :data="Object.values(metrics.months)
"
        ></analytics>
        <div class="text-center pt-5" v-else>
          <small>⚡️ You don't have enough entries to help us generate a report yet. Check back Soon! 💪</small>
        </div>
      </div>
      <div class="col-sm-12 col-lg-4 pt-4">
        <div class="pt-5">
          <h6 class="text-small">All time entries</h6>
          <h5 class="text-medium text-opacity">{{metrics.total}} responses</h5>
        </div>
        <div class="pt-4">
          <h6 class="text-small">Total entries for Month ({{moment().format('MMMM')}})</h6>
          <h5 class="text-medium text-opacity">{{metrics.current_month}} responses</h5>
        </div>
        <div class="pt-4">
          <h6 class="text-small">Percent impressions</h6>
          <h5 class="text-medium" style="color:green">
            {{percentImpressions}}%
            <sup>
              <small>{{percentIncrease}}% compared last month</small>
            </sup>
          </h5>
        </div>
        <div class="pt-2">
          <span>
            <button class="responses entry"></button>
            <small class="pl-2">No of entries</small>
          </span>
          <span class="pl-3">
            <button class="responses month"></button>
            <small class="pl-2">Month</small>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
button {
  &.responses {
    height: 14px;
    width: 14px;
    border-radius: 3px;
    // border-radius: 0px;
    border: none;
    // background: red;
    &.entry {
      background: rgba(41, 235, 205, 1);
    }
    &.month {
      background: rgba(56, 40, 191, 1);
    }
  }
}
</style>

<style lang="scss">
.chartjs-render-monitor {
  // height: 400px !important;
}
</style>


<script>
import Analytics from "@/components/Graph/Analytics";
import moment from "moment";
export default {
  name: "WidgetAnalytics",
  components: { Analytics },
  computed: {
    metrics() {
      return this.$store.getters["feedbacks/single_metric"];
    },
    widget() {
      return this.$store.getters["feedbacks/feedback"];
    },
    percentImpressions() {
      return parseFloat(
        (this.metrics.submitted / this.metrics.total) * 100 || 0
      ).toFixed(2);
    },
    percentIncrease() {
      let percent = parseFloat(
        ((this.metrics.submitted - this.metrics.last_impressions) /
          this.metrics.submitted) *
          100 || 0
      ).toFixed(2);

      return percent > 0 ? `+${percent}` : percent;
    }
  },
  methods: {
    moment
  },
  created() {
    this.metrics.id == this.$route.params.id || this.$store.dispatch("feedbacks/fetchSingleMetric", this.$route.params.id);
  }
};
</script>
