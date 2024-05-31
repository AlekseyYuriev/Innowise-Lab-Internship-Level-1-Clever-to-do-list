<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="auth__title">{{ title }}</h1>
      <form @submit.prevent="handleSubmit" class="auth__form" novalidate>
        <div class="auth__lable">
          <label>
            <input
              v-model="email"
              type="email"
              name="email"
              class="auth__input"
              placeholder="Your email address"
              autocomplete="on"
            />
          </label>
          <div class="input__errors">
            <p
              v-for="err in v$.email.$errors"
              :key="err.$uid"
              class="auth__input-error"
            >
              {{ err.$message }}
            </p>
          </div>
        </div>
        <div class="auth__lable">
          <label>
            <input
              v-model="password"
              type="password"
              name="password"
              class="auth__input"
              placeholder="Password"
              autocomplete="on"
            />
          </label>
          <div class="input__errors">
            <p
              v-for="err in v$.password.$errors"
              :key="err.$uid"
              class="auth__input-error"
            >
              {{ err.$message }}
            </p>
          </div>
        </div>
        <div class="auth__form-error">
          <p v-if="error" class="auth__form-error-text">{{ error }}</p>
        </div>
        <button type="submit" class="auth__button">
          {{ buttonText }}
        </button>
      </form>
      <p class="auth__subtitle">
        {{ subtitleText }}
        <router-link :to="handleRoute || '/register'" class="auth__link">{{
          linkText
        }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import {
  EMAIL_REQUIRED_FIELD,
  EMAIL_TYPE_FIELD,
  PASSWORD_MINLENGTH_FIELD,
  PASSWORD_REQUIRED_FIELD
} from '@/utils/constants'
import useVuelidate from '@vuelidate/core'
import { minLength, required, email, helpers } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage(EMAIL_REQUIRED_FIELD, required),
        email: helpers.withMessage(EMAIL_TYPE_FIELD, email)
      },
      password: {
        required: helpers.withMessage(PASSWORD_REQUIRED_FIELD, required),
        minLength: helpers.withMessage(PASSWORD_MINLENGTH_FIELD, minLength(6))
      }
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
    subtitleText: {
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
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
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
          console.log(err.code)
          if (err.code === 'auth/invalid-credential') {
            this.error = 'Email or password is invalid'
          } else if (err.code === 'auth/email-already-in-use') {
            this.error = `User with email: ${this.email} already exists`
          }
        }
      } else {
        return
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
  margin: 30px auto 0;
  border-radius: 16px;
  box-shadow: 0 20px 40px #525354;
}
.auth__container {
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: auto;
}
.auth__title {
  margin: 50px 0 50px;
  color: #545454;
}
.auth__form {
  width: 100%;
  min-height: 250px;
  margin: 0 auto;
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
  padding: 0 15px 0 15px;
  border: none;
  outline: 1px solid #d9d9d9;
  border-radius: 20px;
  color: #838383;
}
.auth__input::placeholder {
  color: #838383;
}
.input__errors {
  height: 25px;
  padding: 5px 0 0 0;
}
.auth__input-error {
  margin: 0;
  color: rgb(237, 69, 69);
  height: 12px;
  padding: 0 15px 0 15px;
  font-size: 12px;
}
.auth__form-error {
  height: 40px;
  margin: 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(237, 69, 69);
  padding: 0 15px 0 15px;
}
.auth__form-error-text {
  margin: 0;
  font-size: 12px;
}
.auth__button {
  margin: 0;
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
.auth__subtitle {
  display: flex;
  width: 100%;
  margin: 20px 0 70px;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: #545454;
}
.auth__link {
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: #39c6d2;
  text-decoration: underline;
}
@media screen and (max-width: 565px) {
  .auth {
    max-width: 300px;
    margin: 15px auto 0;
    min-height: 320px;
  }
  .auth__container {
    max-width: 280px;
    padding: 0 20px;
  }
  .auth__title {
    margin: 20px 0 30px;
    font-size: 22px;
    padding-left: 15px;
  }
  .auth__form {
    min-height: 210px;
  }
  .auth__input {
    height: 40px;
    font-size: 14px;
  }
  .auth__form-error {
    text-align: center;
    font-size: 12px;
  }
  .auth__button {
    margin: 5px 0 0;
    height: 40px;
    font-size: 14px;
  }
  .auth__subtitle {
    margin: 20px 0 20px;
    font-size: 12px;
  }
  .input__errors {
    height: 30px;
  }
}
</style>
