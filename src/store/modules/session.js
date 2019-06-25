import { Socket } from 'phoenix'
import * as types from '../mutation-types'

// const API_URL = 'http://dev.vulk.co:4000/api'
const API_URL = process.env.API_URL

// const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '') // new line
const WEBSOCKET_URL = API_URL.replace(/(https)/, 'wss').replace(/(http)/, 'ws').replace('/api', '')

const state = {
  socket: null,
  channel: null
}

// getters
const getters = {
  socket: state => state.socket
}

// actions
const actions = {
  connectToSocket ({ commit, store }) {
    const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
      // logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
    })
    socket.connect()
    commit(types.SOCKET_CONNECTED, { socket })
    const channel = socket.channel('dashboard:*')
    let v = this
    channel.join()
    .receive('ok', (response) => {
      let projects = response.reply.projects
      let cncfRelations = response.reply.cncf_relations
      let clouds = response.reply.clouds
      var lastCheckDt = response.reply.last_check_dt
      let kubernetesRefs = response.reply.kubernetes_refs
      commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects, cncfRelations })
      commit(types.GET_ALL_TEST_ENV, {projects, kubernetesRefs})
      commit(types.RECEIVE_CLOUDS, { clouds })
      commit(types.DEFAULT_TEST_ENV)
      // console.log('channel join event date' + lastCheckDt)
      v.dispatch('updateNewTime', lastCheckDt)
    })
  },

  connectToChannel ({ commit, socket }) {
    if (!socket) { return false }
    const channel = socket.channel('dashboard:*')
    channel.join().receive('ok', (response) => {
      (response) => {
      // console.log('channel tings' + response)
      }
      commit(types.DASHBOARD_CONNECTED_TO_CHANNEL, { response })
    })
  }
}

// mutations
const mutations = {
  [types.SOCKET_CONNECTED] (state, { socket }) {
    state.socket = socket
  },
  [types.DASHBOARD_CONNECTED_TO_CHANNEL] (state, { response }) {
    state.channel = response.channel
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

