import api from '../../api/api'
import * as types from '../mutation-types'

// initial state
const state = {
  clouds: []
}

// getters
const getters = {
  allClouds: state => state.clouds
}

// actions
const actions = {
  getAllClouds ({ commit }) {
    api.getDashboard().then((response) => {
      let clouds = response.data.dashboard.clouds
      commit(types.RECEIVE_CLOUDS, { clouds })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_CLOUDS] (state, { clouds }) {
    let newClouds = clouds
    newClouds.sort(function (a, b) {
      return a.order - b.order
    })
    state.clouds = newClouds
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
