<template>
  <nav class="navbar">
    <template v-if="!user">
      <h1 class="navbar__title">Welcom to Tassker!</h1>
      <p class="navbar__subtitle">Your Tasks, Our Care...</p>
    </template>
    <template v-else>
      <div>
        <router-link to="/">HomePage</router-link>
      </div>
      <div>
        <!-- <router-link to="/register">Sign Up</router-link> -->
        <router-link to="/signin">Sign In</router-link>
      </div>
      <div>
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
  box-sizing: border-box;
  max-width: 762px;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.navbar__title {
  margin: 0;
  font-size: 24px;
  color: #545454;
}
.navbar__subtitle {
  margin: 0;
  color: #545454;
  font-weight: 500;
  font-size: 18px;
}
</style>
