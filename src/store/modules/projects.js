import api from '../../api/FixtureApi'
import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allProjects: state => state.all
}

// actions
const actions = {
  getAllProjects ({ commit }) {
    let projects = api.getDashboard().data.dashboard.projects
    commit(types.RECEIVE_DASHBOARD, { projects })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_DASHBOARD] (state, { projects }) {
    state.all = projects
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
