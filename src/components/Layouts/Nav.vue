<template>
  <section class="nav">
    <transition name="fade">
      <div v-show="isMobileNav" class="mobile-menu-overlay">
        <div class="mobile-menu-wrapper">
          <div class="closeMM">
            <button @click="isMobileNav = false">
              <i class="zmdi zmdi-close"></i>
            </button>
          </div>
          <div class="xss">
            <ul>
              <li>
                <a @click="isMobileNav = false" :href="`${baseUrl}#howItWorks`">How it Works</a>
              </li>
              <li>
                <a @click="isMobileNav = false" :href="`${baseUrl}#features`">Features</a>
              </li>
              <li>
                <a @click="isMobileNav = false" :href="`${baseUrl}#pricing`">Pricing</a>
              </li>
              <li>
                <a @click="isMobileNav = false" :href="`${baseUrl}/login`">Login</a>
              </li>
              <li>
                <a :href="`${baseUrl}/get-started`">Get Started</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div class="nav-splash__top">
      <ul>
        <li class="frenchpass"></li>
        <li class="orchid"></li>
        <li class="deco"></li>
        <li class="eastside"></li>
        <li class="wafer"></li>
        <li class="deyork"></li>
      </ul>
    </div>
    <div class="nav-main mt-2">
      <div class="container">
        <nav>
          <div class="nav-main__navs">
            <div class="left">
              <router-link :to="{path:'/'}">
                <img src="@/assets/images/logo_color.svg" style="width:150px">
              </router-link>
            </div>
            <div class="right">
              <ul>
                <li v-if="!$auth.check()">
                  <a class="menulink" :href="`${baseUrl}#howItWorks`">How it Works</a>
                </li>
                <li v-if="!$auth.check()">
                  <a class="menulink" :href="`${baseUrl}#features`">Features</a>
                </li>
                <li v-if="!$auth.check()">
                  <a class="menulink" :href="`${baseUrl}#pricing`">Pricing</a>
                </li>
                <li v-if="!$auth.check()">
                  <router-link class="menulink" :to="{name: 'Login'}">Login</router-link>
                </li>
                <li v-if="!$auth.check()">
                  <router-link :to="{name:'Signup'}">
                    <button class="button button-primary">
                      <span>Get Started</span>
                      <span class="pl-2">
                        <i class="zmdi zmdi-long-arrow-right"></i>
                      </span>
                    </button>
                  </router-link>
                </li>
                <li v-if="$auth.check()">
                  <h6
                    class="text-small text-medium"
                    style="margin-bottom:0"
                  ><img width="20px" height="20px" :src="$auth.user().photo_url || 'data:image/png;base64,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'"> {{$auth.user().first_name}} {{$auth.user().last_name}}</h6>
                  <small class>{{$auth.user().email}}</small>
                </li>
                <li class="mobile-menu" @click="isMobileNav = true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                    ></path>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <!-- {{$auth.check()}} -->
      <div class="sub" v-if="$auth.check()">
        <nav class="submenu">
          <div class="container">
            <ul>
              <router-link :to="{name: 'DashboardHome'}">
                <li class="active">Dashboard</li>
              </router-link>
              <router-link
                :id="checkSubLink('dashboard/widgets') ? 'router-link-exact-active' : ''"
                :to="{name: 'DashboardWidgets'}"
              >
                <li>My Widgets</li>
              </router-link>
              <router-link v-if="$auth.user().plan_id == 1" :to="{name: 'PaymentPlan'}">
                <li>
                  Upgrade
                  <sup>
                    <button>50% off</button>
                  </sup>
                </li>
              </router-link>

              <a @click="logOut">
                <li>Logout</li>
              </a>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      isMobileNav: false,
      baseUrl: process.env.BASE_URL
    }
  },
  methods: {
    checkSubLink(path) {
      const paths = Array.isArray(path) ? path : [path];
      return paths.some(path => {
        return this.$route.path.includes(path);
      });
    },
    showMobileNav() {
      this.isMobileNav = true;
    },
    logOut() {
      let c = confirm("Are you sure you want to logout?");
      if (!c) return;
      this.$auth.logout({
        makeRequest: true,
        params: {}, // data: {} in axios
        success: function() {
          //delete token
          localStorage.removeItem('api_token');
          localStorage.removeItem('token');
          this.$router.push({ name: "login" });
        },
        error: function(e) {},
        redirect: "/login"
        // etc...
      });
    }
  }
};
</script>
