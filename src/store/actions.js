import * as types from './mutation-types'

export const updateDashboard = ({ commit }, payload) => {
  let projects = payload.payload.reply.dashboard.projects
  // let clouds = payload.payload.reply.dashboard.clouds
  commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects })
  // commit(types.RECEIVE_PROJECTS, { projects })
  // commit(types.RECEIVE_CLOUDS, { clouds })
}
