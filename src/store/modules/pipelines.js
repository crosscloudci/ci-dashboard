// import api from '../../api/FixtureApi'
import api from '../../api/api'
import * as types from '../mutation-types'

// initial state
const state = {
  pipelines: []
}

// getters
const getters = {
  allPipelines: state => state.pipelines
}

// actions
const actions = {
  getAllPipelines ({ commit }) {
    let pipelines = []
    api.getDashboard().then((response) => {
      let projects = response.data.dashboard.projects
      let arrayLength = projects.length
      for (var i = 0; i < arrayLength; i++) {
        pipelines << projects[i].pipelines
      }
      commit(types.RECEIVE_PIPELINES, { pipelines })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PIPELINES] (state, { pipelines }) {
    state.pipelines = pipelines
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
