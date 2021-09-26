import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login'
import Home from '../views/home'
import Welcome from '../views/welcome'
import Notfoud from '../views/404'
// import local from '../utils'
import Article from '../views/article'
import Image from '../views/image'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: Home,
    children: [{
      path: '',
      component: Welcome
    }, {
      path: '/article',
      component: Article
    }, {
      path: '/image',
      component: Image
    }]
  }, {
    path: '*',
    component: Notfoud
  }]
})

router.beforeEach((to, from, next) => {
  const user = window.sessionStorage.getItem('hm')
  // const user = local.getUser()
  if (to.path !== '/login' && !user) {
    return next('/login')
  }
  next()
})

export default router
