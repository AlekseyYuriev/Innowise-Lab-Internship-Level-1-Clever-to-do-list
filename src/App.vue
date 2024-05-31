<template>
  <div class="page">
    <navbar-menu v-if="authIsReady"></navbar-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarMenu from './components/NavbarMenu.vue'
export default {
  components: { NavbarMenu },
  data() {
    return {}
  },
  computed: {
    authIsReady() {
      return this.$store.state.authIsReady
    }
  }
}
</script>

<style>
.page {
  min-width: 320px;
  margin: 0 auto;
  padding: 20px;
}
@media screen and (max-width: 565px) {
  .page {
    padding: 15px;
  }
}
</style>
