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
  },
  async mounted() {
    console.log(this.$store.state.user, this.$store.state.isLoggedIn)
  }
}
</script>

<style>
@import './assets/normalize.css';

.page {
  min-height: 100vh;
  min-width: 320px;
  margin: 0 auto;
  padding: 15px 0 0;
  background-color: #e8e8ea;
  font-family: 'Inter', Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
}
</style>
