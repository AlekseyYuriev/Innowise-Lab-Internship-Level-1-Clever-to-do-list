import { createUser, login, logout } from '@/services/auth'

export default {
  state: {
    user: null,
    authIsReady: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    }
  },
  actions: {
    async register(context, { email, password }) {
      const res = await createUser(email, password)
      if (res) {
        console.log(res)
        context.commit('setUser', res.user)
      } else {
        console.log('Error')
        throw new Error('could not complete register')
      }
    },
    async login(context, { email, password }) {
      const res = await login(email, password)
      if (res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      try {
        await logout()
        context.commit('setUser', null)
      } catch (error) {
        throw new Error('could not complete logout')
      }
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    authIsReady(state) {
      return state.authIsReady
    }
  }
}
