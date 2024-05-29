import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
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
      console.log('user state changed: ', state.user)
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
      console.log('register actions')

      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete register')
      }
    },
    async login(context, { email, password }) {
      console.log('login actions')

      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      console.log('logout actions')
      await signOut(auth)
      context.commit('setUser', null)
    },
    changeCurrentDate(context, date) {
      context.commit('setCurrentDate', date)
    }
  }
})

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})

export default store
