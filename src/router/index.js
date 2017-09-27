import Vue from 'vue'
import Router from 'vue-router'
import MainTable from '@/components/MainTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainTable',
      component: MainTable
    }
  ]
})
