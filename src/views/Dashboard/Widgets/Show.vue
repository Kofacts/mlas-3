<template>
  <section>
    <Dashboard-Header>
      <h1 slot="title" class="text-center pt-5">{{widget.name}}</h1>
      <div slot="description" class="pt-5 mt-5">
        <Dashboard-Card class="no-padding">
          <div slot="card-content__fields">
            <div class="tabs">
              <ul class="tabs-list">
                <router-link
                  :to="{name:'DashboardWidget'}"
                  :id="checkSubLink('dashboard/widgets/2/') ? 'router-link-exact-active' : ''"
                >
                  <li>Analytics</li>
                </router-link>
                <router-link
                  :to="{name:'DashboardWidgetDemography'}"
                  :id="checkSubLink('demography') ? 'router-link-exact-active' : ''"
                >
                  <li>Demography Analysis</li>
                </router-link>
                <router-link
                  :to="{name: 'DashboardWidgetDescription'}"
                  :id="checkSubLink('aboutt') ? 'router-link-exact-active' : ''"
                >
                  <li>About Widget</li>
                </router-link>
                <router-link :to="{name: 'EditWidget'}">
                  <li>Edit Widget</li>
                </router-link>
              </ul>

              <div class="tabs-content pt-3 pb-5 pl-4 pr-3">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </Dashboard-Card>
      </div>
    </Dashboard-Header>

    <Dashboard-Card class="mlr-20 no-padding mb-4 mt-4">
      <div slot="card-content__fields">
        <div class="tabs">
          <ul class="tabs-list">
            <router-link style="flex-basis:50%" :to="{name:'DashboardWidget'}">
              <li>Submissions</li>
            </router-link>
            <router-link style="flex-basis:50%" :to="{name:'DashboardWidgetStats'}">
              <li>Response Statistics</li>
            </router-link>
          </ul>

          <div class="tabs-content pt-5 pb-5 pl-4 pr-3">
            <small>+ Click on any row item to see User answers</small>
            <div class="mt-1" v-if="!checkSubLink('statistics')">
              <vuetable
                ref="entriestable"
                :api-url="api"
                class="table-bordered"
                :first-page="0"
                :http-options="{ headers:{ 'Authorization' : 'Bearer ' + $auth.token() } }"
                :fields="columns"
                :append-params="moreParams"
                data-path="data"
                pagination-path
                :detail-row-component="feedbackEntryDetail"
                @vuetable:cell-clicked="onCellClicked"
                track-by="id"
                @vuetable:pagination-data="onPaginationData"
              >
                <template slot="toggle" slot-scope="props">
                  <i class="zmdi zmdi-plus-square"></i>
                </template>
                <template slot="id" slot-scope="props">{{props.rowIndex+1}}</template>
              </vuetable>
              <vuetable-pagination
                v-show="paginationData.total"
                :css="table_css.pagination"
                ref="pagination"
                @vuetable-pagination:change-page="onChangePage"
              ></vuetable-pagination>
            </div>
            <div class="mt-1" v-else>
              <table class="table table-bordered how-response">
                <thead>
                  <tr>
                    <th>Questions</th>
                    <th>How People responded to Survey</th>
                  </tr>
                </thead>
                <tbody v-if="questions.length > 0">
                  <tr v-for="(q,index) in questions" :key="index">
                    <td scope="row">
                      <h5 class="text-medium text-center pt-4 pb-4">{{q.content}}</h5>
                    </td>
                    <td scope="row">
                      <ul class="vote-list">
                        <li :key="o" v-for="(op,o) in q.options">
                          <div
                            class="progress"
                            :style="{width: parseFloat((op.count/q.total) * 100).toFixed(2)+'%'}"
                          ></div>
                          <div class="x">
                            {{op.content | limitString}}
                            <span
                              class="pl-3"
                            >{{parseFloat((op.count/q.total) * 100).toFixed(2)+'%'}}</span>
                            <span class="pl-3 pr-3 text-right float-right">({{op.count + ' votes'}})</span>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center" v-if="questions.length == 0">
                <small>⚡️ You either don't have any entry yet, or this isn't a Survey Widget</small>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="mt-5">
          <vuetable
            ref="entriestable"
            :api-url="api"
            :first-page="0"
            :http-options="{ headers:{ 'Authorization' : 'Bearer ' + $auth.token() } }"
            :fields="columns"
            :append-params="moreParams"
            data-path="data"
            pagination-path
            :detail-row-component="feedbackEntryDetail"
            @vuetable:cell-clicked="onCellClicked"
            track-by="id"
            @vuetable:pagination-data="onPaginationData"
          ></vuetable>
          <vuetable-pagination
            v-show="paginationData.total"
            :css="table_css.pagination"
            ref="pagination"
            @vuetable-pagination:change-page="onChangePage"
          ></vuetable-pagination>
        </div>-->
      </div>
    </Dashboard-Card>
  </section>
</template>

<style lang="scss" scoped>
section.d-header {
  height: 100% !important;
}
.how-response {
  td {
    &:first-child {
      width: 60%;
    }
  }
}
tr {
  cursor: pointer;
}
.vote-list {
  width: 100%;
  list-style-type: none;
  padding: 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  li {
    flex-basis: 100%;
    // height: 50px;
    // padding: 7px;
    border-radius: 5px;
    background: #f5f5f5;
    margin-bottom: 10px;
    font-size: 14px;
    position: relative;
    height: 40px;

    .progress {
      // position: absolute;
      background: rgba(91, 67, 157, 0.6);
      border-radius: 5px;
      width: 33.33%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .x {
      margin-top: -27px;
      margin-left: 0px;
      padding-left: 10px;
      font-size: 13px;
      // padding-top: 5px;
      // padding-bottom: 5px;
    }
    // div {
    //   height: 100%;
    //   background: red;
    //   padding: 7px;
    //   width: calc(100%/3);
    // }
  }
}
</style>

<script>
import DashboardHeader from "@/components/Layouts/DashboardHeader";
import DashboardCard from "@/components/DashboardCards";
import VuetableCss from "@/helpers/vuetable_styling.js";
import VuetablePagination from "@/components/Layouts/VueTablePagination";
import { getPaginationData, toLocal } from "@/helpers/general";
import FeedbackEntryDetail from "@/components/FeedbackEntryDetail.vue";
import moment from "moment";

export default {
  title: "View | Widgets",
  name: "Show",
  components: { DashboardHeader, DashboardCard, VuetablePagination },
  data() {
    return {
      feedbackEntryDetail: FeedbackEntryDetail,
      columns: [
        {
          name: "__slot:toggle",
          title: ""
        },
        {
          name: "__slot:id",
          title: "S/N"
        },
        {
          name: "user.ip_address",
          title: "IP"
        },
        {
          name: "user.email",
          title: "Email"
        },
        {
          name: "user",
          title: "Name",
          callback: user => {
            return `${user.first_name || ""} ${user.last_name || ""}`;
          }
        },
        {
          name: "user.country.name",
          title: "Location"
        },
        {
          name: "user.browser",
          title: "Browser Type"
        },
        {
          name: "user.is_mobile",
          title: "Device Type",
          callback: s => {
            return s ? "Mobile" : "Non Mobile";
          }
        },
        {
          name: "created_at",
          title: "Date Submitted",
          callback: s => {
            return toLocal(s).format("lll");
          }
        }
      ],
      table_css: VuetableCss,
      paginationData: {},
      rowCount: 0,
      moreParams: {
        page: 1,
        per_page: 10,
        include:'user.country,answers.question.options'
      },
      api:
        this.$baseApi + `/feedback_entries?feedback_id=${this.$route.params.id}`
    };
  },
  methods: {
    toLocal,
    moment,
    getPaginationData,
    onPaginationData(paginationData) {
      delete paginationData.data;
      this.paginationData = getPaginationData(paginationData, this.moreParams);
      this.$refs.pagination.setPaginationData(this.paginationData);
    },
    onChangePage(page) {
      this.moreParams.page = page;
      this.setFilters();
    },
    checkSubLink(path) {
      // console.log(this.$route.name.match(/projects/g))
      const paths = Array.isArray(path) ? path : [path];
      return paths.some(path => {
        return this.$route.path.includes(path);
      });
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
        sm.$refs.entriestable.refresh();
        sm.rowCount = sm.$refs.entriestable.tableData;
        sm.loadTable();
      });
    },
    loadTable() {
      let d = this.$refs.entriestable.tableData;
      if (d && d.length > 0) {
        this.rowCount = d;
      }
    },
    onCellClicked(data) {
      this.$refs.entriestable.toggleDetailRow(data.id);
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
    this.metrics.id == this.$route.params.id ||
      this.$store.dispatch(
        "feedbacks/fetchSingleMetric",
        this.$route.params.id
      );
  },
  filters: {
    limitString(d) {
      if (d.length > 20) {
        return d.substring(0, 20) + "...";
      }
      return d;
    }
  }
};
</script>
