import { createRouter,createWebHistory } from 'vue-router'
import loginPage from '@/views/loginPage.vue';
import registerPage from '@/views/registerPage.vue';
import App from '@/App.vue'
import StorePage from '@/views/storePage.vue';
const routes = [
    {path: '/', component: App},
    {path: '/login', component: loginPage},
    {path: '/register', component: registerPage},
    {path: '/store', component: StorePage}
];
const router = createRouter({routes, history: createWebHistory(process.env.BASE_URL)});
export { router}