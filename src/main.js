import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import router from './router'
import store from './store/store'
import inViewportDirective from 'vue-in-viewport-directive'


Vue.config.productionTip = false
Vue.use(Vuex);
Vue.directive('in-viewport', inViewportDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
