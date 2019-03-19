// import api from '../../api/FixtureApi'
import * as types from '../mutation-types'
import * as R from 'ramda'
// initial state
const state = {
  test_envs: [],
  current: 'stable'
}

// getters
const getters = {
  selectedEnv: state => state.current_env
}

// actions
const actions = {
  switchEnv ({ commit }, env) {
    commit(types.SELECT_TEST_ENV, { env })
  }
}

// mutations
const mutations = {
  [types.SELECT_TEST_ENV] (state, {env}) {
    state.current = env
  },
  [types.CHANGE_TEST_ENV] (state, { projects }) {
    let pipelines = []
    let arrayLength = projects.length
    let envs = []
    for (let i = 0; i < arrayLength; i++) {
      if (projects[i].pipelines.length > 0) {
        pipelines.push(projects[i].pipelines)
      }
    }
    for (let i = 0; i < pipelines.length; i++) {
      envs.push(pipelines[i].test_env)
    }
    let testEnvs = R.uniq(envs)
    state.test_envs = testEnvs
  }
}

// organizePipelines(projects) {
//   let environments = []
//   for (let i = 0; i < prength; i++)
// }

export default {
  state,
  getters,
  actions,
  mutations
}
