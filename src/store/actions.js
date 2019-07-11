import * as types from './mutation-types'

export const updateDashboard = ({ commit }, payload) => {
  let projects = payload.payload.reply.projects
  let cncfRelations = payload.payload.reply.cncf_relations
  commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects, cncfRelations })
}

export const updateTestEnv = ({ commit }, payload) => {
  let projects = payload.payload.reply.projects
  let kubernetesRefs = payload.payload.reply.kubernetes_refs
  commit(types.GET_ALL_TEST_ENV, { projects, kubernetesRefs })
}

