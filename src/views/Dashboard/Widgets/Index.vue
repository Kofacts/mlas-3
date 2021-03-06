<template>
  <section>
    <Dashboard-Header>
      <h1 slot="title" class="text-center pt-5">My Widgets</h1>
      <h6 slot="description" class="text-opacity text-center">All of your available widgets</h6>
    </Dashboard-Header>

    <div class="list-wrapper">
      <Dashboard-Card>
        <div slot="card-content__fields">
          <div class="row">
            <div class="col-sm-12">
              <div class="row card-content__fields-form" style="flex-direction:row-reverse">
                <div class="col-sm-3 control">
                  <select @change="fetchWidgets" id="per_page" v-model="moreParams.per_page">
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                  <label for="per_page" class="pl-1 pr-3 pt-2">
                    <h6 class="text-small">Per Page</h6>
                  </label>
                </div>
                <div class="col-sm-3 control">
                  <select @change="fetchWidgets" id="type" v-model="moreParams.type">
                    <option value="poll">Poll</option>
                    <option value="survey">Survey</option>
                    <option value="feedback">Feedback</option>
                  </select>
                  <label for="type" class="pl-1 pr-3 pt-2">
                    <h6 class="text-small">By Type</h6>
                  </label>
                </div>
              </div>
            </div>

            <div class="col-sm-12 list-wrapper__widgets">
              <div
                :key="widget.id"
                v-for="widget in widgets"
                class="row list-wrapper__widgets-item"
              >
                <div class="col-sm-6 wr">
                  <h6 class="text-medium">{{widget.name}}</h6>
                  <h6
                    class="text-small text-opacity list-wrapper__widgets-desc"
                  >{{widget.description}}</h6>
                </div>
                <div class="col-sm-3 wr">
                  <h6 class="badge">{{widget.type | toCapital}}</h6>

                  <div class="pt-3">
                    <small>No of entries</small>
                    <h6 class="text-medium">{{widget.entry_count}} entries</h6>
                  </div>
                </div>

                <div class="col-sm-3 text-center pt-4 wr">
                  <router-link :to="{name:'DashboardWidget', params:{id:widget.id}}">
                    <button class="button button-primary">
                      <span>View Widget</span>
                      <span class="pl-2">
                        <i class="zmdi zmdi-arrow-right-top"></i>
                      </span>
                    </button>
                  </router-link>
                </div>
              </div>
              <div class="dataTables_paginate paging_simple_numbers">
                <ul class="pagination">
                  <li
                    :class="{
                    'paginate_button':true,
                    'page-item':true,
                  'previous':true,
                  'disabled':moreParams.page == 1
                  }"
                  >
                    <button
                      @click="gotoPage(-1)"
                      type="button"
                      :disabled="moreParams.page == 1"
                      aria-controls="kt_table_1"
                      data-dt-idx="0"
                      tabindex="0"
                      class="page-link"
                    >
                      <i class="la la-angle-left"></i>Prev
                    </button>
                  </li>
                  <li
                    :class="{
                    'paginate_button':true,
                    'page-item':true,
                  'active':true,
                  'disabled':true
                  }"
                  >
                    <button
                      disabled
                      type="button"
                      tabindex="0"
                      class="page-link"
                    >{{moreParams.page}}</button>
                  </li>
                  <li
                    :class="{
                    'paginate_button':true,
                    'page-item':true,
                  'next':true,
                  'disabled':moreParams.page == pageData.lastPage
                  }"
                  >
                    <button
                      type="button"
                      @click="gotoPage(+1)"
                      :disabled="moreParams.page == pageData.lastPage"
                      aria-controls="kt_table_1"
                      data-dt-idx="2"
                      tabindex="0"
                      class="page-link"
                    >
                      <i class="la la-angle-right"></i>Next
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Dashboard-Card>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.list-wrapper {
  margin-top: -170px;

  .list-wrapper__widgets {
    margin-top: 20px;
    h6 {
      &.list-wrapper__widgets-desc {
        line-height: 23px;
        text-align: justify;
      }
    }
    .list-wrapper__widgets-item {
      //   border-bottom: 2px solid #f5f5f5;
      border-top: 2px solid #f5f5f5;
      padding-top: 20px !important;
      padding-bottom: 20px !important;
      //   margin-top: 10px;
      .wr {
        &:not(:last-child) {
          border-right: 2px solid #f5f5f5;
        }
      }
    }
  }
}
</style>

<script>
import DashboardHeader from "@/components/Layouts/DashboardHeader";
import DashboardCard from "@/components/DashboardCards";

export default {
  name: "Widgets",
  components: { DashboardHeader, DashboardCard },
  data() {
    return {
      moreParams: {
        per_page: 100,
        type: null,
        page: 1
      }
    };
  },
  methods: {
    fetchWidgets() {
      this.$store.dispatch("feedbacks/index", this.moreParams).then(() => {});
    },
    gotoPage(page) {
      this.moreParams.page = parseInt(this.moreParams.page) + parseInt(page);
      this.fetchWidgets();
    }
  },
  computed: {
    widgets() {
      let data = this.$store.getters["feedbacks/feedbacks"];
      return data.data;
    },
    pageData() {
      let data = this.$store.getters["feedbacks/feedbacks"];
      return {
        lastPage: data.lastPage,
        page: data.page,
        perPage: data.perPage,
        total: data.total
      };
    }
  },
  created() {
    this.fetchWidgets();
    this.moreParams.type = this.$route.query.type || null;
  },
  filters: {
    toCapital(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }
};
</script>
