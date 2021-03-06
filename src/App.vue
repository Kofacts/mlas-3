<template>
  <div id="app" v-if="loaded">
    <Nav/>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  overflow-x: hidden;
  width: 100%;
}
</style>

<script>
import Nav from "@/components/Layouts/Nav";
import "@/assets/styles/main.scss";
export default {
  components: { Nav },
  data: () => ({
    loaded: false
  }),
  beforeMount() {
    this.$auth.ready(() => {
      this.loaded = true;
    });
  }
};
</script>

