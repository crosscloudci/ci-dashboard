import Vue from 'vue'
import Router from 'vue-router'
import MainTable from '@/components/MainTable'
import DemoTable from '@/components/DemoTable'
import DeployTable from '@/components/deployDemo/DeployTable'

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
      component: DeployTable
    },
    {
      path: '/running*',
      name: 'demo-running',
      component: DemoTable
    },
    {
      path: '/success*',
      name: 'demo-success',
      component: DemoTable
    }
  ]
})
