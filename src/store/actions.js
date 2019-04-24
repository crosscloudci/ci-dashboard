import * as types from './mutation-types'

export const updateDashboard = ({ commit }, payload) => {
  let projects = payload.payload.reply.dashboard.projects
  commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects })
}

export const updateTestEnv = ({ commit }, payload) => {
  let projects = payload.payload.reply.dashboard.projects
  let kubernetesRefs = payload.payload.reply.kubernetes_refs
  commit(types.GET_ALL_TEST_ENV, { projects, kubernetesRefs })
}

