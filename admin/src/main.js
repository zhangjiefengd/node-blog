import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'

import './style.css'


Vue.config.productionTip = false

Vue.prototype.$http = http
// 在vue全局添加可使用的函数
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + 'upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ' '}`
      }
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
