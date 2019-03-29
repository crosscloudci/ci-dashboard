import * as types from './mutation-types'

export const updateDashboard = ({ commit }, payload) => {
  let projects = payload.payload.reply.dashboard.projects
  commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects })
}

