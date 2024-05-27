<template>
  <div class="page">
    <navbar-menu></navbar-menu>
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
  width: 100%;
  margin: 0 auto;
  padding: 30px 0 30px 0;
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
