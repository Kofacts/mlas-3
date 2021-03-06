<template>
  <section>
    <Header>
      <h1 slot="title">Login to your Account</h1>
      <h6
        slot="description"
        class="text-opacity"
      >Manage your widgets and track feedbacks from your account!</h6>
    </Header>

    <div class="container mb-4">
      <Card style="width:40vmax">
        <div slot="card-content__fields">
          <!-- <div class="card-content__stage"></div> -->
          <form>
            <div class="row card-content__fields-form">
              <div class="col-sm-12 col-lg-12 control">
                <input
                  v-model="body.email"
                  id="email"
                  type="email"
                  value
                  placeholder="Enter your email Address"
                >
                <label for="email" class="pl-1 pr-3 pt-2">
                  <h6 class="text-small">Email Address</h6>
                </label>
              </div>
              <div class="col-sm-12 col-lg-12 control mt-4">
                <input
                  v-model="body.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  value
                  placeholder="Enter your password"
                >
                <label for="password" class="pl-1 pr-3 pt-2">
                  <h6 class="text-small">Password</h6>
                </label>
                <span class="password-icon" @click="showPassword = !showPassword">
                  <i class="zmdi zmdi-eye"></i>
                </span>
              </div>

              <div class="col-sm-12 mt-4">
                <button
                  type="button"
                  @click="login"
                  :class="{
                    'disabled':loading,
                    'button':true,
                    'button-primary':true,
                    'float-right':true,
                    'pl-4':true,
                    'pr-4':true
                  }"
                >
                  <span v-if="!loading">Login Account</span>
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
      </Card>
    </div>
  </section>
</template>

<script>
import Header from "@/components/Layouts/Header";
import Card from "@/components/Cards";

export default {
  title: "Login",
  name: "Login",
  components: { Header, Card },
  data() {
    return {
      loading: false,
      showPassword: false,
      body: {
        email: "",
        password: "",
        rememberMe: true
      }
    };
  },
  methods: {
    login() {
      this.errorMsg = [];
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.loading = true;
          this.submit();
        }
      });
    },
    submit() {
      let redirect = this.$auth.redirect();

      this.$auth.login({
        data: this.body,
        rememberMe: this.body.rememberMe,
        staySignedIn: this.body.rememberMe,
        redirect: {
          name: redirect ? redirect.from.name : "DashboardHome"
        },
        success: () => {
          this.loading = false;
        },
        error: err => {
          if (err.response) {
            if (err.response.status == 403) {
              this.errorMsg.push(err.response.data.message);
            }
          }
          this.loading = false;
        }
      });
    }
  },
  created() {
    if(this.$auth.check()) {
      this.$router.push({path:'/dashboard'});
    }
  }
};
</script>
