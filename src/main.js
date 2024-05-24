import { createApp } from 'vue'
import App from './App.vue'
import PageLoader from './components/PageLoader.vue'
import router from './router'

const app = createApp(App)

app.component('PageLoader', PageLoader)

app.use(router)

app.mount('#app')
