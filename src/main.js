import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from '@/router/router'
import Vuelidate from 'vuelidate'
import store from './store/index.js'
const app = createApp(App);
app.use(router)
.use(Vuelidate)
.use(store)
.mount('#app');
