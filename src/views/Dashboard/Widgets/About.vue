<template>
  <section>
    <div class="row">
      <div class="col-sm-4">
        <h6 class="text-small text-opacity">Widget Name</h6>
        <h6>{{widget.name}}</h6>
      </div>
      <div class="col-sm-4">
        <h6 class="text-small text-opacity">Widget Type</h6>
        <h6>{{widget.type}}</h6>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-sm-12">
        <h6 class="text-small text-opacity">Widget description</h6>
        <h6 style="line-height:26px">{{widget.description}}</h6>
      </div>
    </div>

    <div class="row mt-5">
      <h6 class="text-medium pl-3">Widget Code</h6>
      <div class="col-sm-12 card-content__fields-codeblock">
        <div class="alert alert-info" v-if="message">{{message}}</div>
        <pre class="p-5">
            <code @click="copyToClipboard(widget.embed_code)">{{widget.embed_code}}</code>
        </pre>
      </div>
    </div>
    <!-- <div class="mt-5">
      <vuetable
        ref="vuetable"
        :api-mode="false"
        :data="questions"
        :first-page="0"
        :http-options="{ headers:{ 'Authorization' : 'Bearer ' + $auth.token() } }"
        :fields="columns"
        :detail-row-component="widgetDetail"
        @vuetable:cell-clicked="onCellClicked"
        track-by="id"
      ></vuetable>
    </div>-->
  </section>
</template>
<script>
import VuetableCss from "@/helpers/vuetable_styling.js";
import WidgetDetail from "@/components/WidgetDetail.vue";

export default {
  name: "Analytics",
  data() {
    return {
      message:"",
      columns: [
        {
          name: "id",
          title: "S/N"
        },
        {
          name: "content",
          title: "Content"
        },
        {
          name: "options",
          title: "Options",
          callback: options => {
            return `<ul>${options.map(s => `<li>${s.content}</li>`)}<ul>`;
          }
        }
      ],
      widgetDetail: WidgetDetail,
      table_css: VuetableCss
    };
  },
  methods: {
    onChangePage(page) {
      this.moreParams.page = page;
      this.setFilters();
    },
    copyToClipboard(str) {
      const el = document.createElement("textarea");
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.message = "Code copied to clipboard";
      setTimeout(() => (this.message = ""), 4000);
    },
    setFilters() {
      for (let [key, value] of Object.entries(this.moreParams)) {
        if (typeof value === "object") {
          //append id to params
          this.moreParams[key + "_id"] = value.id;
        }
        if (value === "") {
          delete this.moreParams[key];
        }
      }
      let sm = this;
      this.$nextTick(() => {
        sm.$refs.vuetable.refresh();
        sm.rowCount = sm.$refs.vuetable.tableData;
        sm.loadTable();
      });
    },
    loadTable() {
      let d = this.$refs.vuetable.tableData;
      if (d && d.length > 0) {
        this.rowCount = d;
      }
    },
    onCellClicked(data) {
      this.$refs.vuetable.toggleDetailRow(data.id);
    }
  },
  computed: {
    widget() {
      return this.$store.getters["feedbacks/feedback"];
    },
    metrics() {
      return this.$store.getters["feedbacks/single_metric"];
    },
    questions() {
      let q = this.metrics.questions || {};
      let array = [];
      Object.values(q).forEach(value => {
        let options = [];
        Object.values(value.options).forEach(v => {
          options.push(v);
        });
        value.options = options;
        array.push(value);
      });

      return array;
    }
  },
  created() {
    this.widget.id == this.$route.params.id || this.$store.dispatch("feedbacks/fetchSingle", this.$route.params.id);
    this.metrics.id == this.$route.params.id || this.$store.dispatch("feedbacks/fetchSingleMetric", this.$route.params.id);
  }
};
</script>
