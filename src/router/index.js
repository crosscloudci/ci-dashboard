import Vue from 'vue'
import Router from 'vue-router'
import MainTable from '@/components/MainTable'
import DemoTable from '@/components/DemoTable'

Vue.use(Router)

export default new Router({
  hashbang: false,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainTable',
      component: MainTable
    },
    {
      path: '/deploy*',
      name: 'demo-deploy',
      component: DemoTable
    },
    {
      path: '/running*',
      name: 'demo-running',
      component: DemoTable
    },
    {
      path: '/build*',
      name: 'demo-build',
      component: DemoTable
    },
    {
      path: '/provisioning*',
      name: 'demo-provisioning',
      component: DemoTable
    },
    {
      path: '/home*',
      name: 'demo-home',
      component: DemoTable
    },
    {
      path: '/success*',
      name: 'demo-success',
      component: DemoTable
    }
  ]
})
