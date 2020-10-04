import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import router from './router'
import store from './store/store'
import inViewportDirective from 'vue-in-viewport-directive'

import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.use(Vuex);
Vue.config.productionTip = false
Vue.directive('in-viewport', inViewportDirective);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')