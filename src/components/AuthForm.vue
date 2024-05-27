<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="auth__title">{{ title }}</h1>
      <form @submit.prevent class="auth__form">
        <label class="auth__lable">
          <input
            v-model="email"
            type="email"
            name="email"
            class="auth__input"
            placeholder="Your email address"
          />
        </label>
        <label class="auth__lable">
          <input
            v-model="password"
            type="password"
            name="email"
            class="auth__input"
            placeholder="Password"
          />
        </label>
        <p v-if="error">{{ error }}</p>
        <button @click="handleSubmit" type="button" class="auth__button">
          {{ buttonText }}
        </button>
      </form>
      <router-link :to="handleRoute || '/register'" class="auth__link">{{
        linkText
      }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      required: true
    }
  },
  computed: {
    handleRoute() {
      if (this.$route.fullPath === '/signin') {
        return '/register'
      }
      return '/signin'
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (this.$route.fullPath === '/signin') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          })
          this.$router.push('/')
        } else {
          await this.$store.dispatch('register', {
            email: this.email,
            password: this.password
          })
          this.$router.push('/')
        }
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>

<style scoped>
.auth {
  max-width: 762px;
  min-height: 400px;
  width: 100%;
  background-color: #fff;
  margin: 50px auto 0;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
}
.auth__container {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: auto;
}
.auth__title {
  margin: 50px 0 50px;
  color: #545454;
}
.auth__form {
  width: 100%;
  min-height: 250px;
  margin: 30px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.auth__lable {
  width: 100%;
}
.auth__input {
  box-sizing: border-box;
  display: flex;
  height: 50px;
  width: 100%;
  margin: 0;
  padding: 0 0 0 15px;
  border: none;
  outline: 1px solid #d9d9d9;
  border-radius: 20px;
  color: #838383;
}
.auth__input::placeholder {
  color: #838383;
}
.auth__button {
  margin: 20px 0 0;
  padding: 0;
  width: 100%;
  height: 50px;
  border: none;
  outline: 1px solid #d9d9d9;
  border-radius: 20px;
  background-color: #fe8c2c;
  color: #fefbf8;
  cursor: pointer;
  transition:
    opacity 0.3s,
    transform 0.2s;
}
.auth__button:hover {
  opacity: 0.8;
  transform: scale(101%);
}
.auth__button:active {
  transform: scale(98%);
}
.auth__link {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px 0 80px;
  cursor: pointer;
  color: #39c6d2;
  text-decoration: underline;
}
</style>
