import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import GetStarted from '../views/Onboarding/GetStarted';
import SignUp from '../views/Onboarding/SignUp';
import Login from '../views/Auth/Login';
import PaymentPlan from '../views/Onboarding/PaymentPlan';
import Widget from '../views/Onboarding/Widget';
import Embed from '../views/Onboarding/Embed';
import Customise from '../views/Onboarding/Customise';

//
import DashboardIndex from '../views/Dashboard/Index';
import DashboardHome from '../views/Dashboard/Home';
import DashboardWidgets from '../views/Dashboard/Widgets/Index';
import DashboardWidget from '../views/Dashboard/Widgets/Show';
import DashboardWidgetAnalytics from '../views/Dashboard/Widgets/Analytics';
import DashboardWidgetDescription from '../views/Dashboard/Widgets/About';
import DashboardWidgetDemography from '../views/Dashboard/Widgets/Demography';
import DashboardWidgetStats from '../views/Dashboard/Widgets/Statistics';
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/get-started',
    name: 'Home',
    component: GetStarted,
    children: [
        {
        path: '/',
        name: 'Signup',
        component: SignUp,
      },
      {
        path: 'payment-plan',
        name: 'PaymentPlan',
        component: PaymentPlan,
        meta: {
          auth: true
        }
      },
      {
        path: 'widget',
        name: 'Widget',
        component: Widget,
        meta: {
          auth: true
        }
      },
      {
        path: 'widget/:id/edit',
        name: 'EditWidget',
        component: Widget,
        meta: {
          auth: true
        }
      },
      {
        path: ':id/customise',
        name: 'Customise',
        component: Customise,
        meta: {
          // auth: true
        }
      },
      {
        path: ':id/embed',
        name: 'Embed',
        component: Embed,
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardIndex,
    meta: {
      auth: true
    },
    children: [{
      path: '/',
      name: 'DashboardHome',
      component: DashboardHome,
    }, {
      path: 'widgets',
      name: 'DashboardWidgets',
      component: DashboardWidgets,
    }, {
      path: 'widgets/:id',
      // name: 'DashboardWidget',
      component: DashboardWidget,

      children: [{
          name: 'DashboardWidget',
          path: '/',
          component: DashboardWidgetAnalytics,
          children: [{
            name: 'DashboardWidgetStats',
            path: 'statistics',
            component: DashboardWidgetStats
          }]
        },
        {
          name: 'DashboardWidgetDescription',
          path: 'about',
          component: DashboardWidgetDescription
        },
        {
          name: 'DashboardWidgetDemography',
          path: 'demography',
          component: DashboardWidgetDemography
        }
      ]
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  hashbag: true,
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (to.path != from.path) {
      return {
        x: 0,
        y: 0
      };
    }
  }
})

export default router
