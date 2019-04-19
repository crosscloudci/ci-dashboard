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

const debug = process.env.NODE_ENV !== 'production'
console.log(debug)

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
