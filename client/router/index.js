import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Memorial from '../views/Memorial'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/Memorial',
      component: Memorial
    }
  ]
})
