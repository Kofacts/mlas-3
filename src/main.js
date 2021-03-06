import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuetable from 'vuetable-2';
import {get} from 'lodash'
import {
  LayoutPlugin,
  BPopover
} from 'bootstrap-vue'
import VueAuth from "@websanova/vue-auth";
import VeeValidate from 'vee-validate';
import axios from "axios";
import VueAxios from "vue-axios";
import Vuex from "vuex";
import store from '@/store'
import VueColor from 'vue-color'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import 'vue-multiselect/dist/vue-multiselect.min.css'
import Multiselect from 'vue-multiselect'
import VCalendar from 'v-calendar';
import titleMixin from '@/mixins/titleMixin'

Vue.use(LayoutPlugin);
Vue.component('vuetable', Vuetable);
Vue.component('b-popover', BPopover);
Vue.component('vuetable', Vuetable);
Vue.component('multiselect', Multiselect)
Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.router = router;
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(VueToast);
Vue.mixin(titleMixin);
Vue.component("colorpicker", VueColor);
Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields'
});
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});
Vue.prototype.$baseApi = process.env.VUE_APP_BASE_URI;
Vue.prototype.$appName = process.env.VUE_APP_NAME;

Vue.use(VueAuth, {
  auth: {
    request: function (req, token) {
      this.options.http._setHeaders.call(this, req, {
        Authorization: "Bearer " + token
      });
    },
    response: function (res) {
      var token = res.data.token;
      if (token) {
        token = token.split("Bearer ");

        return token[token.length > 1 ? 1 : 0];
      }
    }
  },
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x"),
  loginData: {
    url: Vue.prototype.$baseApi + "/auth/login",
    fetchUser: true,
    method: "POST"
  },
  logoutData: {
    url: Vue.prototype.$baseApi + "/auth/logout",
    method: "GET"
  },
  registerData: {
    url: Vue.prototype.$baseApi + "/auth/register",
    autoLogin: true,
    method: "POST"
  },
  refreshData: {
    url: Vue.prototype.$baseApi + "/auth/me",
    method: "GET",
    enabled: true,
    error (err) {
      if (err && err.response && (err.response.status >= 400 || err.response.status <= 500)) {
       // Vue.$auth.logout()
        router.push({name:'Login'}).catch(()=>{});
      }
    },
    interval: 30
  },
  fetchData: {
    url: Vue.prototype.$baseApi + "/auth/me",
    method: "GET",
    enabled: true
  }
});

Vue.axios.interceptors.response.use(
    res => res,
    function (error) {
      let conf = error.config
      if (conf && !conf.url.match(/auth\/refresh$/) && !conf.url.match(/login$/)) {
        let status = get(error, 'response.status', undefined)
        if (status == 401) {
          //Vue.$auth.logout()
          router.push({name:'Login'}).catch(()=>{});
          return Promise.reject(error)
        }
      }
      return Promise.reject(error)
    }
)

 new Vue({
  router,
  store: new Vuex.Store(store),
  render: h => h(App)
}).$mount('#app')
