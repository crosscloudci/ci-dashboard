import * as types from '../mutation-types'
// import moment from 'moment'
// initial state
const state = {
  now: ''
}

// getters
const getters = {
  updateTime: state => state.now
}

// actions
const actions = {
  updateNewTime ({ commit }, lastCheckDt) {
    console.log('updateNewTime lastCheckDt: ' + lastCheckDt)
    // payload = payload.substr(payload.length - 9)
    // let time = Date.now()
    // payload = payload.replace(/T|Z/g, ' ').trim()
    let dateobj = Date.parse(lastCheckDt)
    lastCheckDt = new Date(dateobj)
    // payload = formattedDate.toLocaleTimeString()
    commit(types.UPDATE_TIME, { lastCheckDt })
  }
}
// mutations
const mutations = {
  [types.UPDATE_TIME] (state, { lastCheckDt }) {
    console.log('lastCheckedMutation: ' + lastCheckDt)
    state.now = lastCheckDt
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
