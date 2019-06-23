import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import http from './http'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
