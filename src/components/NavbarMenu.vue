<template>
  <nav class="navbar">
    <template v-if="!user">
      <div class="navbar__title-wrapper">
        <h1 class="navbar__title">Welcom to Tassker!</h1>
      </div>
      <div class="navbar__subtitle-wrapper">
        <p class="navbar__subtitle">Your Tasks, Our Care...</p>
      </div>
    </template>
    <template v-else>
      <div>
        <router-link to="/" class="navbar__button navbar__button-home"
          >HomePage</router-link
        >
      </div>

      <div class="navbar__wapper">
        <p class="navbar__text">
          Logged in as: <span class="navbar__email">{{ user.email }}</span>
        </p>
        <button @click="handleLogout" class="navbar__button">Log Out</button>
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
  padding: 15px 50px;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.navbar__wapper {
  display: flex;
  align-items: center;
  gap: 30px;
}
.navbar__text {
  margin: 0;
  color: #838383;
}
.navbar__email {
  margin: 0 0 0 5px;
  color: #545454;
  font-weight: 600;
}
.navbar__button {
  text-decoration: none;
  padding: 0;
  width: 100px;
  height: 30px;
  border: none;
  outline: 1px solid #d9d9d9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fefbf8;
  background-color: #fe8c2c;
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.2s;
}

.navbar__button:not(:disabled):hover {
  opacity: 0.8;
  transform: scale(101%);
}
.navbar__button:not(:disabled):active {
  transform: scale(98%);
}
@media screen and (max-width: 565px) {
  .navbar {
    max-width: 320px;
    padding: 10px 20px;
    flex-direction: column;
    gap: 0;
  }
  .navbar__title-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
  .navbar__subtitle-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .navbar__title {
    font-size: 16px;
  }
  .navbar__subtitle {
    font-size: 14px;
  }
  .navbar__wapper {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .navbar__text {
    font-size: 14px;
  }
  .navbar__email {
    margin: 0;
  }
  .navbar__button {
    width: 70px;
    height: 25px;
    font-size: 14px;
  }
  .navbar__button-home {
    display: none;
  }
}
</style>
