<template>
  <section>
    <Header v-if="!ishome">
      <h1 slot="title">Plan & Payment</h1>
      <h6 slot="description" class="text-opacity">Select plan and make necessary payment to proceed</h6>
    </Header>​
    <div class="container no-padd-mobile">
      <Card :stage="2">
        <div slot="card-content__fields">
          <!-- <div class="card-content__stage"></div> -->
          <div class="signup-box" :id="ishome ? 'xmh-100':''">
            <form @submit.prevent="proceedNext" class="card-content__fields-form pl-2 pr-2">
              <div class="row mt-5">
                <div class="col-sm-12">
                  <h6 class="text-medium text-opacity">SELECT PLAN</h6>​
                  <div class="row mt-4">
                    <div :key="index" v-for="(p,index) in plans" class="col-sm-12 col-lg-4">
                      <div
                        :class="`card package p-4 basic ${p.name}`"
                        :id="selectedPlan.id && p.types.filter(s => s.id == selectedPlan.id).length ? 'selected' : ''"
                      >
                        <h5 class="text-center text-medium">{{p.name}} Plan</h5>
                        <div
                          class="row mt-4"
                          id="price"
                          style="border-top:2px solid #F5F5F5; border-bottom:2px solid #F5F5F5"
                        >
                          <div
                            :key="i"
                            id="p"
                            v-for="(type,i) in p.types"
                            @click="togglePlan(index,type.id)"
                            :class="{
                                                        'col-sm-6':true,
                                                        'btn-dark':selectedPlan.id == type.id,
                                                       'recommended': type.recommended,
                                                       'mt-3':true,
                                                    }"
                          >
                            <h4 class="text-medium pt-3">
                              ${{type.price}}
                              <sup>
                                <small>{{type.interval | toCapital}}</small>
                              </sup>
                            </h4>
                            <!-- <h6 class="text-small text-opacity">{{type.interval}}</h6> -->
                          </div>
                        </div>
                        <div class="row mt-2 pt-4">
                          <div class="col-sm-12">
                            <h6 class="text-small text-medium">Features List</h6>
                          </div>
                          <div class="col-sm-12 mt-2">
                            <h6
                              class="text-small"
                              v-for="(feature, index) in p.features"
                              :key="index"
                            >
                              <i class="zmdi zmdi-check-circle pr-2"></i>
                              {{feature | toCapital}}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 pt-4" v-if="this.selectedPlan.id && !ishome">
                      <h6 style="line-height:24px">
                        Selected Plan:
                        <a
                          class="text-medium text-primary"
                        >{{this.selectedPlan.name}} Plan</a>
                      </h6>
                      <h6
                        style="line-height:24px"
                        v-html="`You ${this.selectedPlan.price > 0 ? `are required to pay <b>$${this.selectedPlan.price}</b> by clicking on` : 'just need to click'} the button below to activate your plan and proceed with customising your Widget!`"
                      ></h6>
                    </div>
                  </div>
                </div>
              </div>​
              <div class="mt-5">
                <div class="card-content__fields-form__footer mt-5">
                  <button :disabled="loading" class="button button-primary float-right pl-4 mt-5 pr-4">
                    <span
                      v-if="!loading"
                    >{{ishome ? 'Get Started' : (this.selectedPlan.id == 1 ? `Activate Plan` : `Proceed to Payment`)}}</span>
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
                        </rect>​
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
​
<style lang="scss" scoped>
.zmdi-check-circle {
  color: #5b439d;
}

.btn-dark {
  &::after {
    color: black !important;
  }
}

.card {
  &.package {
    cursor: pointer;
    height: 430px;

    h4 {
      font-size: 23px !important;
    }
  }

  #selected {
    border: 2px solid #5b439d;
  }
}

#price {
  display: flex;

  #p {
    padding-top: 5px;
    padding-bottom: 10px;

    &:first-child {
      border-right: 2px solid #f5f5f5;
    }
  }
}

.recommended {
  position: relative;

  &::after {
    content: "👑 RECOMMENDED";
    position: absolute;
    top: 0;
    background: wheat;
    width: 80%;
    border-radius: 5px;
    transform: translate(1px, -10px);
    font-family: "graphikMedium";
    font-size: 10px;
    padding: 5px;
  }
}

.package {
  &.Free {
    #p {
      margin: 0 auto;
      border-right: 2px solid transparent !important;
    }
  }
}
</style>
​
<script>
import Header from "@/components/Layouts/Header";
import Card from "@/components/Cards";
import swal from "sweetalert";

export default {
  title: "Pricing - Onboarding",
  name: "Pricing",
  components: { Header, Card },
  props: ["ishome"],
  data() {
    return {
      loading: false,
      selectedPlan: {},
      plans: [
        {
          name: "Free",
          features: [
            "1 Widget",
            "Feedback only",
            "No Filters",
            "2 Templates",
            "100 max. responses"
          ],
          types: [
            {
              id: 1,
              price: 0,
              duration: 1,
              recommended: 0,
              interval: "monthly",
              payment_link: null
            }
          ]
        },
        {
          name: "Basic",
          features: [
            "5 Widgets",
            "Widget customization",
            "Feedback and Poll only",
            "2 Templates per category",
            "10000 max. responses"
          ],
          types: [
            {
              id: 2,
              price: 10,
              duration: 1,
              recommended: 0,
              interval: "monthly",
              payment_link:
                //  "https://ravesandbox.flutterwave.com/pay/i5beanz9xitz"
                "https://flutterwave.com/pay/kseiezhdjgub"
            },
            {
              id: 3,
              price: 110,
              duration: 12,
              recommended: 1,
              interval: "yearly",
              payment_link:
                //"https://ravesandbox.flutterwave.com/pay/ecesnlyiq2mu"
                "https://flutterwave.com/pay/k1hfhsomtqme"
            }
          ]
        },
        {
          name: "Standard",
          features: [
            "unlimited Widgets",
            "Feedback, Poll & Survey",
            "All Filters",
            "Unlimited Templates",
            "unlimited responses",
            "webhook",
            "Widget customization"
          ],
          types: [
            {
              id: 4,
              price: 30,
              duration: 1,
              recommended: 0,
              interval: "monthly",
              payment_link:
                //  "https://ravesandbox.flutterwave.com/pay/te79dekorfs9"
                "https://flutterwave.com/pay/y25mo2jlaneh"
            },
            {
              id: 5,
              price: 300,
              duration: 12,
              recommended: 0,
              interval: "yearly",
              payment_link:
                //        "https://ravesandbox.flutterwave.com/pay/ebooccercack"
                "https://flutterwave.com/pay/5e2wejjsdhtw"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  methods: {
    proceedNext() {
      // trigger payment
      this.ishome
        ? this.$router.push({ path: "/get-started" })
        : this.selectedPlan.payment_link
        ? (window.location.href = this.selectedPlan.payment_link)
        : this.$router.push({ name: "Widget" });
    },
    togglePlan(index, id) {
      let plan = this.plans[index];
      let type = this.plans[index].types.filter(s => s.id == id)[0];
      this.selectedPlan = {
        id: type.id,
        name: plan.name,
        price: type.price,
        payment_link: type.payment_link
      };

      if (this.ishome) {
        localStorage.setItem("selected_plan", `${index}|${id}`);
      }
    },
    verifyPayment(txref) {
      let loadingSwal = swal;
      loadingSwal({
        closeOnClickOutside: false,
        button: {
          text: "Verifying Payment...",
          closeModal: false
        }
      });

      this.$store
        .dispatch("payments/verify", { transaction_reference: txref })
        .then(async data => {
          this.$auth.refresh();
          loadingSwal.close();
          let innerHtml = `<span>Payment of <strong>${data.payment.currency} ${
            data.payment.amount
          }</strong> for <strong>${
            data.plan.name
          }</strong> plan has been verified.`;
          let html = document.createElement("div");
          html.innerHTML = innerHtml;
          swal({
            title: "Proceed or not?",
            content: html,
            buttons: ["Nah", "Sure, go ahead"],
            icon: "warning"
          }).then(confirm => {
            if (confirm) {
              this.$router.push({ name: "Widget" });
            }
          });
        })
        .catch(() => {
          loadingSwal.close();
          swal("Oops", "Failed to verify payment!", "error");
        })
        .finally(() => {});
    }
  },
  created() {
    // this.plans.length || this.$store.dispatch('global/fetchPlans');
    let status = this.$route.query.status;
    let txRef = this.$route.query.txRef;

    if (txRef) {
      if (status === "success") {
        this.verifyPayment(txRef);
      } else {
        // show payment failure error
        swal(
          "Oops",
          "Your payment wasn't successful. Please try again or contact us!",
          "error"
        );
      }
    }

    let index = 0;
    let id = 1;

    let selectedPlan = localStorage.getItem("selected_plan");
    if (selectedPlan) {
      let splitArray = selectedPlan.split("|");
      index = splitArray[0];
      id = splitArray[1];
    }

    this.togglePlan(index, id);
  },
  mounted() {
    if (this.ishome) {
      document.getElementById("stage2").style.display = "none";
    }
  },
  filters: {
    toCapital(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }
};
</script>
