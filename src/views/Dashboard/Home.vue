<template>
  <section>
    <Dashboard-Header>
      <div slot="title" class="pt-5">
        <Alert v-if="$auth.user().plan_id==1">
          <h6 slot="description">
            You are currently on Basic Plan and restricted to just 20 Entries.
            Upgrade to enjoy more benefits! -
            <router-link :to="{name:'PaymentPlan'}" class="text-primary text-medium">Upgrade</router-link>
          </h6>
        </Alert>
      </div>
      <div slot="description" class="pt-5">
        <Dashboard-Card>
          <div slot="card-content__fields">
            <div>
              <ul class="d-card-flex">
                <li class="d-card-flex__greetings">
                  <div>
                    <button>👋🏻</button>
                  </div>
                  <div>
                    <small class="text-opacity">Welcome back, {{$auth.user().first_name}}</small>
                    <h5 class="text-medium">My Dashboard</h5>
                  </div>
                </li>
                <li>
                  <router-link :to="{name:'Widget'}">
                    <button class="button button-primary">
                      <span>Create Widget</span>
                      <span class="pl-2">
                        <i class="zmdi zmdi-plus-circle"></i>
                      </span>
                    </button>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="d-card-items pt-3">
              <div class="d-card-items__wrapper">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20.753 23c-.868 0-1.684-.338-2.297-.951l-10.602-11.174-.607.652-1.929 1.93-5.318-5.32 2.51-2.511.683.459c.026.015.171.086.304.086.054 0 .12-.008.215-.104.195-.195.312-.471.475-.854.323-.759.765-1.801 2.174-2.861 1.19-.897 2.66-1.352 4.367-1.352 2.713 0 5.107 1.163 5.208 1.212l-.341 1.891c-1.658.166-4.558.762-3.318 2.007l10.786 11.358c.6.602.937 1.417.937 2.284s-.337 1.683-.951 2.296c-.614.614-1.429.952-2.296.952zm-9.341-11.368l8.47 9.017c.444.443 1.28.458 1.753-.013.235-.236.366-.55.366-.883 0-.333-.13-.647-.367-.884l-8.457-9.002-1.765 1.765zm-8.585-3.495l2.492 2.493.021-.022c-.138-.558-.058-1.225.524-1.806.346-.346.777-.529 1.25-.529.651 0 1.307.34 2.004 1.039l.893.893 1.766-1.767-.915-.915c-1.171-1.172-1.027-2.24-.838-2.772.246-.689.807-1.258 1.661-1.695-.312-.036-.633-.057-.958-.057-1.264 0-2.329.319-3.165.949-.98.738-1.25 1.374-1.537 2.047-.212.5-.431 1.016-.901 1.485-.45.452-1.013.69-1.627.69-.227 0-.437-.032-.623-.08l-.047.047zm13.553-.619l3.336-3.296c.169-.17.443-.168.611 0 .169.17.169.442.001.611l-3.353 3.313.866.912 3.375-3.335c.168-.169.441-.168.611.001.168.168.169.441 0 .609l-3.392 3.352 1.011 1.064 3.679-3.637c.584-.582.875-1.346.875-2.11 0-.768-.293-1.537-.88-2.125-.585-.585-1.35-.877-2.114-.877-.766 0-1.53.293-2.114.877l-3.569 3.528 1.057 1.113zm-7.233 7.65l-4.127 3.993c-.229.229-.503.407-.79.558l-.58.302-1.025 2.146.833.833 2.101-1.07.301-.58c.151-.286.347-.545.574-.774l4.091-3.958-1.378-1.45z"
                    ></path>
                  </svg>
                </span>
                <span>
                  <router-link :to="{name:'DashboardWidgets'}">
                    <small>Widgets</small>
                    <h5 class="text-medium">{{activeWidgets}} Active</h5>
                  </router-link>
                </span>
              </div>
              <div class="d-card-items__wrapper">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006zm1.024 13.975c0 .566-.458 1.025-1.024 1.025-.565 0-1.024-.459-1.024-1.025 0-.565.459-1.024 1.024-1.024.566 0 1.024.459 1.024 1.024zm1.141-8.192c-.498-.505-1.241-.783-2.09-.783-1.786 0-2.941 1.271-2.941 3.237h1.647c0-1.217.68-1.649 1.261-1.649.519 0 1.07.345 1.117 1.004.052.694-.319 1.046-.788 1.493-1.157 1.1-1.179 1.633-1.173 2.842h1.643c-.01-.544.025-.986.766-1.785.555-.598 1.245-1.342 1.259-2.477.008-.758-.233-1.409-.701-1.882z"
                    ></path>
                  </svg>
                </span>
                <span>
                  <router-link :to="{name:'DashboardWidgets', query:{type:'survey'}}">
                    <small>Surveys</small>
                    <h5 class="text-medium">{{submissions('survey')}} submissions</h5>
                  </router-link>
                </span>
              </div>
              <div class="d-card-items__wrapper">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19.406 9.558c-1.21-.051-2.87-.278-3.977-.744.2-.812.42-2.114.477-2.595.118-1.007-1.099-1.978-2.847-2.184-2.807-.337-3.321 1.205-3.321 1.205-2.006 4.976-4.974 5.473-7.738 5.832v9.928c3.503 0 5.584.729 8.169 1.842 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-5.195-4.182c.778.411.789.905-.071 1.104-.895.208-2.093.035-2.715-.292-.71-.373-.697-.886.011-1.08.798-.217 2.033-.124 2.775.268zm3.685 9.041s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c2.477-.568 4.835-1.59 6.701-5.042.772.404 1.81.589 2.741.547-.117.5-.241.995-.363 1.489 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116zm-3.878-11.861c-.047.271-.305.455-.578.409-.271-.045-.456-.305-.409-.577l.335-1.972c.049-.286.263-.416.481-.416.282 0 .568.217.506.583l-.335 1.973zm3.297-.496c.201-.188.209-.505.021-.705-.192-.202-.509-.21-.708-.021l-1.456 1.372c-.201.188-.209.506-.021.706.189.201.504.211.706.021l1.458-1.373zm-6.048-1.645c-.102-.257-.392-.382-.647-.281-.259.103-.383.394-.282.649l.739 1.858c.102.257.392.384.648.281.258-.103.383-.394.282-.649l-.74-1.858z"
                    ></path>
                  </svg>
                </span>
                <span>
                  <router-link :to="{name:'DashboardWidgets', query:{type:'poll'}}">
                    <small>Polls</small>
                    <h5 class="text-medium">{{submissions('poll')}} entries</h5>
                  </router-link>
                </span>
              </div>
              <div class="d-card-items__wrapper">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M2.001 9.352c0 1.873.849 2.943 1.683 3.943.031 1 .085 1.668-.333 3.183 1.748-.558 2.038-.778 3.008-1.374 1 .244 1.474.381 2.611.491-.094.708-.081 1.275.055 2.023-.752-.06-1.528-.178-2.33-.374-1.397.857-4.481 1.725-6.649 2.115.811-1.595 1.708-3.785 1.661-5.312-1.09-1.305-1.705-2.984-1.705-4.695-.001-4.826 4.718-8.352 9.999-8.352 5.237 0 9.977 3.484 9.998 8.318-.644-.175-1.322-.277-2.021-.314-.229-3.34-3.713-6.004-7.977-6.004-4.411 0-8 2.85-8 6.352zm20.883 10.169c-.029 1.001.558 2.435 1.088 3.479-1.419-.258-3.438-.824-4.352-1.385-.772.188-1.514.274-2.213.274-3.865 0-6.498-2.643-6.498-5.442 0-3.174 3.11-5.467 6.546-5.467 3.457 0 6.546 2.309 6.546 5.467 0 1.12-.403 2.221-1.117 3.074zm-7.563-3.021c0-.453-.368-.82-.82-.82s-.82.367-.82.82.368.82.82.82.82-.367.82-.82zm3 0c0-.453-.368-.82-.82-.82s-.82.367-.82.82.368.82.82.82.82-.367.82-.82zm3 0c0-.453-.368-.82-.82-.82s-.82.367-.82.82.368.82.82.82.82-.367.82-.82z"
                    ></path>
                  </svg>
                </span>
                <span>
                  <router-link :to="{name:'DashboardWidgets', query:{type:'feedback'}}">
                    <small>Feedbacks</small>
                    <h5 class="text-medium">{{submissions('feedback')}} responses</h5>
                  </router-link>
                </span>
              </div>
            </div>
          </div>
        </Dashboard-Card>
      </div>
    </Dashboard-Header>
    <div class="container mb-5">
      <div class="row">
        <div class="col-sm-12 col-lg-6">
          <Dashboard-Card>
            <div slot="card-content__fields">
              <h5 class="text-medium">My Widgets</h5>

              <div class="widgets-list" v-if="loadedWidgets">
                <ul class="widgets-list__items mt-5">
                  <li :key="widget.id" class v-for="widget in topWidgets">
                    <router-link :to="{name:'DashboardWidget', params:{id:widget.id}}">
                      <div class="row">
                        <div class="col-sm-7">
                          <h6 class="text-medium text-opacity">{{widget.name}}</h6>
                          <span class="badge">{{widget.type | toCapital}}</span>
                        </div>
                        <div class="col-sm-5 text-right pr-4 pt-3">
                          <span :to="{name:'DashboardWidget', params:{id:widget.id}}">
                            <i class="zmdi zmdi-long-arrow-right"></i>
                          </span>
                        </div>
                      </div>
                    </router-link>
                  </li>
                </ul>
                <router-link
                  :to="{name:'DashboardWidgets'}"
                  class="text-right float-right text-small text-medium"
                >
                  <small>View All Widgets</small>
                </router-link>
              </div>
              <div v-else><h4>Loading widgets...</h4></div>
            </div>
          </Dashboard-Card>
        </div>
        <div class="col-sm-12 col-lg-6">
          <Dashboard-Card>
            <div slot="card-content__fields">
              <h5 class="text-medium">Activity Log</h5>

              <div class="row activities mt-5" v-if="loadedEntries">
                <div :key="entry.id" v-for="entry in entries" class="activity col-sm-12">
                  <h6>
                    <span
                      v-html="`${entry.user
                      ? (entry.user.first_name ? entry.user.first_name +' '+(entry.user.last_name || '') : `${entry.user.email || 'A User'}`)
                      : 'A User'} ${entry.user && entry.user.country ? 'from '+entry.user.country.name : ''} just filled your ${entry.feedback ? entry.feedback.type : 'Widget'}`"
                    ></span>,
                    <span
                      class="text-medium text-primary"
                    >{{entry.feedback && entry.feedback.name}}</span>
                    {{fromNow(entry.updated_at)}}
                  </h6>
                </div>
              </div>
              <div v-else><h4>Loading Recent entries...</h4></div>
            </div>
          </Dashboard-Card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import DashboardHeader from "@/components/Layouts/DashboardHeader";
import DashboardCard from "@/components/DashboardCards";
import Alert from "@/components/Alert";
import moment from "moment";
import {fromNow} from "@/helpers/general";
import {toLocal} from "../../helpers/general";

export default {
  name: "Dashboard",
  title: "Dashboard",
  components: { DashboardHeader, Alert, DashboardCard },
  data() {
    return {
      entries: [],
      loadedWidgets : false,
      loadedEntries : false,
    };
  },
  methods: {
    moment,
    fromNow,
    submissions(type) {
      return this.entries.filter(s => {
        return s.feedback && s.feedback.type && s.feedback.type == type;
      }).length;
    },
    fetchEntries(created_at_from) {
      if(this.$route.name !== 'DashboardHome') return;
      let params = {
        per_page:10,
        include:'feedback,user.country'
      };
      if(created_at_from) {
        params.created_at_from = created_at_from
      }
      this.$store.dispatch("feedbacks/fetchEntries", params).then(data => {
        this.loadedEntries = true;
        this.entries = this.entries.concat(...data).sort(function(a, b) {
          return a.id - b.id;
        }).reverse();
        let lastData = this.entries[0];
        let createdAtFrom;
        if(lastData) {
          createdAtFrom = moment(lastData.updated_at).utc(true).add(1, 's').format('YYYY-MM-DD HH:mm:ss');
        }
        setTimeout(() => this.fetchEntries(createdAtFrom), 2000);
      });
    }
  },
  computed: {
    widgets() {
      return this.$store.getters["feedbacks/feedbacks"] &&
        this.$store.getters["feedbacks/feedbacks"].data
        ? this.$store.getters["feedbacks/feedbacks"].data
        : [];
    },
    activeWidgets() {
      return this.widgets.filter(s => s.status == 2).length;
    },
    topWidgets() {
      return this.widgets ? this.widgets.slice(0, 4) : [];
    }
  },
  created() {
    this.$store.dispatch('feedbacks/index').then(() => {
      this.loadedWidgets = true;
    });
    this.fetchEntries();
  },
  filters: {
    toCapital(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.activities {
  .activity {
    border-bottom: 1px solid #f5f5f5;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
