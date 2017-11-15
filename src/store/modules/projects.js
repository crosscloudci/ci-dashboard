import api from '../../api/api'
import * as types from '../mutation-types'

// initial state
const state = {
  projects: []
}

// getters
const getters = {
  allProjects: state => state.projects
}

// actions
const actions = {
  getAllProjects ({ commit }) {
    api.getDashboard().then((response) => {
      let projects = response.data.dashboard.projects
      commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_DASHBOARD_PROJECTS] (state, { projects }) {
    state.projects = projects
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
