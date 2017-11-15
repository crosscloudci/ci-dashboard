import { Socket } from 'phoenix'
import * as types from '../mutation-types'

// const API_URL = 'http://dev.vulk.co:4000/api'
const API_URL = process.env.API_URL

const WEBSOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api', '') // new line

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
  connectToSocket ({ commit }) {
    const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
      logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
    })
    socket.connect()
    commit(types.SOCKET_CONNECTED, { socket })
    const channel = socket.channel('dashboard:*')
    channel.join()
    .receive('ok', (response) => {
      (response) => { console.log('channel tings' + response) }
      let projects = response.reply.projects
      let clouds = response.reply.clouds
      commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects })
      commit(types.RECEIVE_CLOUDS, { clouds })
      // commit(types.DASHBOARD_CONNECTED_TO_CHANNEL, { response })
    })
  },
  connectToChannel ({ commit, socket }) {
    if (!socket) { return false }
    const channel = socket.channel('dashboard:*')
    channel.join().receive('ok', (response) => {
      (response) => { console.log('channel tings' + response) }
      commit(types.DASHBOARD_CONNECTED_TO_CHANNEL, { response })
    })
  }
}

// mutations
const mutations = {
  // [types.SOCKET_CONNECTED] (state, { dashboard }) {
  //   state.projects = dashboard.projects
  //   state.pipelines = dashboard.pipelines
  //   state.clouds = dashboard.clouds
  // }
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

