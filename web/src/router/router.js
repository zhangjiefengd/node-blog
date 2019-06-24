import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'
import Article from '../components/Article'
import Articles from '../components/Articles'
import HomeContent from '../components/HomeContent'
import Individual from '../components/Individual'

Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', name: 'home', component: Home,redirect: '/home', children: [
      { path: '/home', name: 'homeContent', component: HomeContent },
      { path: '/article_list', name: 'articles', component: Articles },
      { path: '/individual', name: 'individual', component: Individual }
    ]
  },
    { path: '/article/:id', name: 'article', component: Article, props: true }
  ]
})
export default router