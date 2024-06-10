import { createApp } from 'vue'
import App from './App.vue'
import PageLoader from './components/PageLoader.vue'
import router from './router'
import store from './store'
import './assets/normalize.css'
import './assets/base.css'

const app = createApp(App)

app.component('PageLoader', PageLoader)

app.use(router)
app.use(store)

app.mount('#app')
