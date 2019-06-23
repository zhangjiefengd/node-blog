import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

import Main from './views/Main.vue'


import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'

import Individual from './views/Individual.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: {isPublic: true} },
    {
      path: '/',
      name: 'home',
      component: Main,
      children: [
        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },

        { path: '/admin_users', component: AdminUserEdit },
        { path: '/admin_users/:id', component: AdminUserEdit, props: true },
        { path: '/admin_users/list', component: AdminUserList },
        
        { path: '/individual', component: Individual }
      ],
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
