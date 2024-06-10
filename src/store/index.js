import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { createStore } from 'vuex'
import userState from './modules/userState'

const store = createStore({
  state: {
    currentDate: new Date()
      .toISOString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('-')
  },
  mutations: {
    setCurrentDate(state, payload) {
      state.currentDate = payload
    }
  },
  actions: {
    changeCurrentDate(context, date) {
      context.commit('setCurrentDate', date)
    }
  },
  getters: {
    currentDate(state) {
      return state.currentDate
    }
  },
  modules: {
    userState
  }
})

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})

export default store
