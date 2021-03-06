<template>
  <section>
    <Header>
      <h1 slot="title">🎉Yippee, Widget Created!</h1>
      <h6
        slot="description"
        class="text-opacity"
      >Copy the code below and paste on your website or customise on your dashboard</h6>
    </Header>

    <div class="container no-padd-mobile">
      <Card :stage="4" v-if="feedback.embed_code">
        <div slot="card-content__fields">
          <h6 class="text-medium">Widget Code</h6>

          <div class="card-content__fields-codeblock mt-2 text-medium">
            <div class="alert alert-info" v-if="message">{{message}}</div>
            <pre class="p-5">
                <code @click="copyToClipboard(feedback.embed_code)">{{feedback.embed_code}}</code>
            </pre>
            <small>Place this code snippet just before the closing tag your website html</small>
            <h5>Integrations</h5>
             <h6>Wordpress</h6>
             <ul>
               <li>Goto settings -> plugins -> add new and search for Insert Headers and Footers</li>
               <li>Install & activate Insert Headers and Footers</li>
               <li>Goto settings -> insert headers and footers /wp-admin/options-general.php?page=insert-headers-and-footers</li>
               <li>Paste the code inside the "Scripts in Footer” field and click save</li>
             </ul>

            <h6>SPAs (React/Vue/Angular etc)</h6>
            <ul>
              <li>Open public/index.html</li>
              <li>Paste the code just before the body closing {{'</ body>'}} tag </li>
            </ul>

            <h6>Other websites</h6>
              <ul>
                <li>Paste the code just before the closing body tag {{'</ body>'}} in your main html file</li>
              </ul>
          </div>

          <div class="mt-5">
            <div class="card-content__fields-form__footer mt-5">
              <router-link :to="{path:'/dashboard'}">
              <button class="button button-primary float-right pl-4 pr-4">
                <span>Goto Dashboard</span>
                <span class="pl-2">
                  <i class="zmdi zmdi-long-arrow-right"></i>
                </span>
              </button>
              </router-link>
              <button type="button" class="button button-outline float-right pl-4 pr-4 mr-2">
                <!-- <span class="pr-2">
                    <i class="zmdi zmdi-long-arrow-left"></i>
                </span>-->
                <span @click="$router.go(-1)">Go back</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
      <h3 v-else>Fetching Embed code...</h3>
    </div>
  </section>
</template>


<script>
import Header from "@/components/Layouts/Header";
import Card from "@/components/Cards";

export default {
  title:"Embed - Onboarding",
  name:"Embed",
  components: { Header, Card },
  data() {
    return {
      message:''
    }
  },
  computed:{
    feedback() {
      return this.$store.getters['feedbacks/feedback']
    }
  },
  methods: {
    copyToClipboard(str) {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.message = 'Code copied to clipboard';
      setTimeout(() => this.message = '', 2000);
    }
  },
  created() {
    (this.feedback.id == this.$route.params.id && this.feedback.embed_code)
    || this.$store.dispatch('feedbacks/fetchSingle', this.$route.params.id);
  }
};
</script>
