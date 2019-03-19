import * as types from './mutation-types'

export const updateDashboard = ({ commit }, payload) => {
  let projects = payload.payload.reply.dashboard.projects
  // let lastUpdatedTime = payload.payload.reply.dashboard.last_check_dt
  // let clouds = payload.payload.reply.dashboard.clouds
  commit(types.CHANGE_TEST_ENV, { projects })
  commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects })
}

