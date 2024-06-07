import { auth } from '@/firebase'
import { createUser, login, logout } from '@/services/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    currentDate: new Date()
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('-')
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    },
    setCurrentDate(state, payload) {
      state.currentDate = payload
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
    },
    changeCurrentDate(context, date) {
      context.commit('setCurrentDate', date)
    }
  },
  getters: {
    currentDate(state) {
      return state.currentDate
    },
    user(state) {
      return state.user
    },
    authIsReady(state) {
      return state.authIsReady
    }
  }
})

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})

export default store
