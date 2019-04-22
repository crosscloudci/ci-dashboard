// import api from '../../api/FixtureApi'
import * as types from '../mutation-types'
import * as R from 'ramda'
// initial state
const state = {
  test_envs: [],
  testEnvList: [],
  current: {},
  defaultDropdownEnv: ''
}

// getters
const getters = {
  selectedEnv: state => state.current,
  allTestEnvs: state => state.testEnvList,
  defaultEnv: state => state.defaultDropdownEnv
}

// actions
const actions = {
  getDropdownEnvs ({ dispatch, commit }) {
    return dispatch('updateDashboard').then((payload) => { commit(types.GET_ALL_TEST_ENV, { payload }) })
  },
  switchEnv ({ commit }, env) {
    commit(types.SELECT_TEST_ENV, { env })
  },
  getDefaultEnv ({ commit }, env) {
    commit(types.DEFAULT_TEST_ENV, { env })
  }
}

// mutations
const mutations = {
  [types.DEFAULT_TEST_ENV] (state) {
    let defaultEnv = state.current.dropdown
    state.defaultDropdownEnv = defaultEnv
  },
  [types.SELECT_TEST_ENV] (state, {env}) {
    state.current = env.env
    return state.current
  },
  [types.GET_ALL_TEST_ENV] (state, {projects, kubernetesRefs}) {
    let list = gatherKubernetesEnvs(projects)
    state.testEnvList = list
    for (let i = 0; i < list.length; i++) {
      let hi = R.match(/Stable/, list[i].dropdown)
      if (hi.length > 0) {
        state.current = list[i]
        return state.current
      }
    }
  }
}

var gatherKubernetesEnvs = (projects) => {
  let arrayLength = projects.length
  let envs = {}
  let pipelines = []
  for (let i = 0; i < arrayLength; i++) {
    if (projects[i].title === 'Kubernetes') {
      let kubernetesPipelines = projects[i].pipelines
      for (let j = 0; j < kubernetesPipelines.length; j++) {
        let pipelineObj = k8PipelineObj(kubernetesPipelines[j].release_type, kubernetesPipelines[j].ref, kubernetesPipelines[j].sha, kubernetesPipelines[j].jobs)
        pipelines.push(pipelineObj)
      }
    }
  }
  let getEnvs = (pipelines) => {
    let envList = []
    for (let i = 0; i < pipelines.length; i++) {
      // this will need to be later when the architectures are included with the dropdown
      // currently this code will only let the dropdown work in the scenario of stable/head branches for only amd64
      if (pipelines[i].kubernetes_release_type === 'stable') {
        let environment = `Stable ${pipelines[i].ref}`
        envList.push(environment)
      } else if (pipelines[i].kubernetes_release_type === 'head') {
        let environment = `Head ${pipelines[i].sha.substring(0, 7)}`
        envList.push(environment)
      }
    }
    let uniqEnvs = R.uniq(envList)
    envs.dropdown = uniqEnvs
    return envs
  }
  let dropdownList = getEnvs(pipelines)
  pipelines = mergeDropdownWithPipelines(dropdownList, pipelines)
  // pipelines.push(dropdownList)
  const arePipelinesEqual = R.eqProps('dropdown')
  let uniqPipelines = R.uniqWith(arePipelinesEqual)(pipelines)
  return uniqPipelines
}

var mergeDropdownWithPipelines = (dropdownList, pipelines) => {
  let finalTestEnvList = []
  let env = []
  let finalK8Pipeline = []
  for (let i = 0; i < pipelines.length; i++) {
    for (let j = 0; j < dropdownList.dropdown.length; j++) {
      if (pipelines[i].kubernetes_release_type === 'stable') {
        env = R.match(/Stable/, dropdownList['dropdown'][j])
        if (env.length > 0) {
          finalK8Pipeline = R.mergeAll([{dropdown: dropdownList['dropdown'][j]}, pipelines[i]])
          finalTestEnvList.push(finalK8Pipeline)
        }
      }
      if (pipelines[i].kubernetes_release_type === 'head') {
        env = R.match(/Head/, dropdownList['dropdown'][j])
        if (env.length > 0) {
          finalK8Pipeline = R.mergeAll([{dropdown: dropdownList['dropdown'][j]}, pipelines[i]])
          finalTestEnvList.push(finalK8Pipeline)
        }
      }
    }
  }
  return finalTestEnvList
}

var k8PipelineObj = function (releaseType, ref, sha, jobs) {
  let obj = {}
  obj.kubernetes_release_type = releaseType
  obj.ref = ref
  obj.sha = sha
  obj.jobs = jobs
  return obj
}

export default {
  state,
  getters,
  actions,
  mutations
}
