import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import projects from './modules/projects'
import pipelines from './modules/pipelines'
import clouds from './modules/clouds'
import session from './modules/session'
import time from './modules/timeTracker'
import environments from './modules/test_environments'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
// console.log(debug)
console.log(
  `%c
       ______   _   __   ______   ______     ______   ____
      / ____/  / | / /  / ____/  / ____/    / ____/  /  _/
     / /      /  |/ /  / /      / /_       / /       / /  
    / /___   / /|  /  / /___   / __/      / /___   _/ /   
    \\____/  /_/ |_/   \\____/  /_/         \\____/  /___/   

Howdy! 

Thanks for dropping by, we love input from the community. 
Feel free to submit a pull request https://github.com/crosscloudci/ci-dashboard!
`, 'font-family:monospace')

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    projects,
    pipelines,
    clouds,
    session,
    environments,
    time
  }
})
