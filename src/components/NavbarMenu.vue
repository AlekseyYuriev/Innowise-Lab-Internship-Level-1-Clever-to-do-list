<template>
  <nav class="navbar">
    <h1>Vuex Auth</h1>
    <template v-if="authIsReady">
      <div>
        <router-link to="/">HomePage</router-link>
      </div>
      <div v-if="!user">
        <router-link to="/register">Sign Up</router-link>
        <router-link to="/signin">Sign In</router-link>
      </div>
      <div v-if="user">
        <button @click="handleLogout">Log Out</button>
      </div>
    </template>
  </nav>
</template>

<script>
export default {
  methods: {
    async handleLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/signin')
    }
  },
  computed: {
    authIsReady() {
      return this.$store.state.authIsReady
    },
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
.navbar {
  margin: 0 auto;
  padding-bottom: 50px;
  max-width: 762px;
  display: flex;
  justify-content: space-around;
}
</style>
