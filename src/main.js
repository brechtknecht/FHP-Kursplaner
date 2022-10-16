import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router'
import Vuex from 'vuex';
import App from './App.vue'
import store from './store/store'
import inViewportDirective from 'vue-in-viewport-directive'
import Home from './views/Home.vue'

import Axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}

/* Handle */

app.use(Vuex);
app.config.productionTip = false
app.directive('in-viewport', inViewportDirective);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:id',
    name: 'home-id',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(router)
app.use(store)

app.mount('#app')