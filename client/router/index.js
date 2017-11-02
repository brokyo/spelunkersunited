import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Meta from 'vue-meta'
Vue.use(Meta)

import Home from '../views/Home'
import Memorial from '../views/Memorial'
import ToDo from '../views/todo'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/memorial',
      component: Memorial
    },
    {
      path: '/todo',
      component: ToDo
    }
  ]
})
