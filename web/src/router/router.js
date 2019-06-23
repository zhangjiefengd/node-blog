import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'
import Article from '../components/Article'

Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/article/:id', name: 'article', component: Article, props: true }
  ]
})
export default router