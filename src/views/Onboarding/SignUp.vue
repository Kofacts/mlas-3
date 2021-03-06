<template>
  <section>
    <Header>
      <h1 slot="title">Let's get Started</h1>
      <h6 slot="description" class="text-opacity">Quickly Sign up with Google account to Proceed</h6>
    </Header>

    <div class="container no-padd-mobile">
      <Card :stage="1">
        <div slot="card-content__fields">
          <!-- <div class="card-content__stage"></div> -->
          <div class="signup-box">
            <button @click="getGoogleInfo" class="button button-social" v-show="!socialConnected">
              <span>
                <img src="@/assets/images/google_logo.svg">
              </span>
              <span>Continue with Google</span>
              <span>
                <i class="zmdi zmdi-arrow-right-top"></i>
              </span>
            </button>
            <button @click="socialConnected = true" class="button-social mt-2 pl-3" v-show="!socialConnected">
              <span>Signup Manually</span>
              <span>
                <i class="zmdi zmdi-arrow-right-top"></i>
              </span>
            </button>

            <div
              :key="index"
              class="alert alert-danger alert-dismissible"
              v-for="(error,index) in apiErrors"
            >{{error}}</div>
            <form
              @submit.prevent="register"
              v-show="socialConnected"
              class="card-content__fields-form pl-2 pr-2"
            >
              <div class="row">
                <div class="col-sm-12 col-lg-6 control">
                  <input
                    id="first-name"
                    v-model="body.first_name"
                    type="text"
                    placeholder="Enter First name"
                  >
                  <label for="first-name" class="pl-1 pr-3 pt-2">
                    <h6 class="text-small">First Name</h6>
                  </label>
                  <small
                    class="form-text text-danger"
                    v-show="errors.has('first_name')"
                  >{{errors.first('first_name')}}</small>
                </div>
                <div class="col-sm-12 col-lg-6 control">
                  <input
                    v-model="body.last_name"
                    id="last-name"
                    type="text"
                    placeholder="Enter Last name"
                  >
                  <label for="last-name" class="pl-1 pr-3 pt-2">
                    <h6 class="text-small">Last Name</h6>
                  </label>
                  <small
                    class="form-text text-danger"
                    v-show="errors.has('last_name')"
                  >{{errors.first('last_name')}}</small>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-sm-12 col-lg-6 control">
                  <input v-model="body.email" id="email" placeholder="Enter Email" type="text">
                  <label for="email" class="pl-1 pr-3 pt-2">
                    <h6 class="text-small">Email</h6>
                  </label>
                  <small
                    class="form-text text-danger"
                    v-show="errors.has('email')"
                  >{{errors.first('email')}}</small>
                </div>
                <div class="col-sm-12 col-lg-6 control">
                  <input
                    v-model="body.password"
                    id="password"
                    placeholder="Enter Password"
                    :type="showPassword ? 'text' : 'password'"
                  >
                  <label for="password" class="pl-1 pr-3 pt-2">
                    <h6 class="text-small">Password</h6>
                  </label>
                  <span class="password-icon" @click="showPassword = !showPassword">
                    <i class="zmdi zmdi-eye"></i>
                  </span>
                  <small
                    class="form-text text-danger"
                    v-show="errors.has('password')"
                  >{{errors.first('password')}}</small>
                </div>
              </div>

              <div class="mt-5">
                <div class="card-content__fields-form__footer mt-5">
                  <button
                    :disabled="loading"
                    @click="register"
                    :class="{
                    'disabled':loading,
                    'button':true,
                    'button-primary':true,
                    'float-right':true,
                    'pl-4':true,
                    'pr-4':true
                  }"
                  >
                    <span v-if="!loading">Complete Registration</span>
                    <span v-if="!loading" class="pl-2">
                      <i class="zmdi zmdi-long-arrow-right"></i>
                    </span>
                    <span v-if="loading">
                      <svg
                        fill="#FFFFFF"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        style="enable-background:new 0 0 50 50;"
                        xml:space="preserve"
                      >
                        <rect x="0" y="0" width="4" height="7" fill="#FFF">
                          <animateTransform
                            attributeType="xml"
                            attributeName="transform"
                            type="scale"
                            values="1,1; 1,3; 1,1"
                            begin="0s"
                            dur="0.6s"
                            repeatCount="indefinite"
                          ></animateTransform>
                        </rect>

                        <rect x="10" y="0" width="4" height="7" fill="#FFF">
                          <animateTransform
                            attributeType="xml"
                            attributeName="transform"
                            type="scale"
                            values="1,1; 1,3; 1,1"
                            begin="0.2s"
                            dur="0.6s"
                            repeatCount="indefinite"
                          ></animateTransform>
                        </rect>
                        <rect x="20" y="0" width="4" height="7" fill="#FFF">
                          <animateTransform
                            attributeType="xml"
                            attributeName="transform"
                            type="scale"
                            values="1,1; 1,3; 1,1"
                            begin="0.4s"
                            dur="0.6s"
                            repeatCount="indefinite"
                          ></animateTransform>
                        </rect>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.zmdi-check-circle {
  color: #5b439d;
}
.card {
  &.package {
    cursor: pointer;
    height: 400px;
  }
  #selected {
    border: 2px solid #5b439d;
  }
}
</style>

<script>
import Header from "@/components/Layouts/Header";
import Card from "@/components/Cards";

export default {
  name: "Signup",
  title: "Signup",
  components: { Header, Card },
  data() {
    return {
      socialConnected:false,
      loading: false,
      body: {
        email: null
      },
      apiErrors: [],
      showPassword: false
    };
  },
  computed: {

  },
  methods: {
    register() {
      this.loading = true;
      this.$auth.register({
        params: this.body,
        autologin: true,
        success: () => {
          //console.log(JSON.stringify(data, null, 4))
          this.loading = false;
        },
        error: err => {
          this.loading = false;
          // console.log(err)
          if (err.response && err.response.data.status_code == 422) {
            for (let e in err.response.data) {
              this.errors.add(e.field, e.message);
            }
          } else {
            // unexpected error e.g 50x error
            this.apiErrors.push("Registration failed. Please try again.");
          }
        },
        redirect: { name: "PaymentPlan" }
      });
    },
    getGoogleInfo() {
      window.location.href = `${process.env.VUE_APP_BASE_URI}/google/redirect`;
    }
  },
  created() {
    let token = this.$route.query.token;
    if(token) {
      localStorage.removeItem('api_token');
      localStorage.removeItem('token');

      this.$auth.token(null, token);
      this.$auth.refresh().then( ({data:{data}}) => {
        this.body = data;
        this.$auth.watch.loaded = true
        this.$auth.user(data);
        this.$auth.watch.authenticated = true;
        document.cookie='rememberMe=false'
        this.socialConnected = true;
      });
    }
  }
};
</script>
