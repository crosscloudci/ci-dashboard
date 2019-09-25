// import api from '../../api/FixtureApi'
import * as types from '../mutation-types'
import * as R from 'ramda'
// initial state
const state = {
  test_envs: [],
  testEnvList: [],
  current: {},
  envReleaseList: [],
  envArchList: [],
  selectedRelease: '',
  selectedArch: '',
  defaultDropdownEnv: ''
}

// getters
const getters = {
  selectedEnv: state => state.current,
  allTestEnvs: state => state.testEnvList,
  selectableTestEnvReleases: state => state.envReleaseList,
  selectableTestEnvArch: state => state.envArchList,
  defaultEnv: state => state.defaultDropdownEnv
}

// actions
const actions = {
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
      if (state.current.dropdown === list[i].dropdown) {
        return state.current
      }
    }
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
        let pipelineObj = k8PipelineObj(kubernetesPipelines[j].release_type, kubernetesPipelines[j].ref, kubernetesPipelines[j].sha, kubernetesPipelines[j].jobs, kubernetesPipelines[j].arch)
        pipelines.push(pipelineObj)
      }
    }
  }
  let establishSelectableEnvs = (pipelines) => {
    // debugger

    state.envReleaseList = R.uniq(state.envReleaseList.concat(pipelines.map(p => p.kubernetes_release_type)))
    state.envArchList = R.uniq(state.envArchList.concat(pipelines.map(p => p.arch)))

    // TODO: move arch nicknames here to view
    // state.envArchList = [
    //   {'arch': 'amd64', 'name': 'x86'}, 
    //   {'arch': 'arm64', 'name': 'Arm'}
    // ]
  } 
  let getEnvs = (pipelines) => {
    let envList = []
    // TODO: update below to have envList also include arch and kubernetes_release_type so you can filter for them
    for (let i = 0; i < pipelines.length; i++) {
      // this will need to be later when the architectures are included with the dropdown
      // currently this code will only let the dropdown work in the scenario of stable/head branches for only amd64
      if ((pipelines[i].kubernetes_release_type === 'stable') && (pipelines[i].arch === 'amd64')) {
        let order = 1
        let environment = `Stable ${pipelines[i].ref}`
        envList.push({'environment': environment, 'order': order})
      } else if ((pipelines[i].kubernetes_release_type === 'head') && (pipelines[i].arch === 'amd64')) {
        let order = 3
        let environment = `Head ${pipelines[i].sha.substring(0, 7)}`
        envList.push({'environment': environment, 'order': order})
      } else if (pipelines[i].kubernetes_release_type === 'stable') {
        let order = 2
        let environment = `Stable ${pipelines[i].ref} Arm`
        envList.push({'environment': environment, 'order': order})
      } else if (pipelines[i].kubernetes_release_type === 'head') {
        let order = 4
        let environment = `Head ${pipelines[i].sha.substring(0, 7)} Arm`
        envList.push({'environment': environment, 'order': order})
      }
    }
    let uniqEnvs = R.uniq(envList)
    let sortUniqEnvs = R.sortBy(R.prop('order'))
    let sortedUniqEnvs = sortUniqEnvs(uniqEnvs)
    envs.dropdown = sortedUniqEnvs
    return envs
  }
  let dropdownList = getEnvs(pipelines)
  establishSelectableEnvs(pipelines)
  pipelines = mergeDropdownWithPipelines(dropdownList, pipelines)
  const arePipelinesEqualByDropdown = R.eqProps('dropdown')
  let finalUniqPipelines = R.uniqWith(arePipelinesEqualByDropdown)(pipelines)
  return finalUniqPipelines
}

var mergeDropdownWithPipelines = (dropdownList, pipelines) => {
  let finalTestEnvList = []
  let env = []
  let arch = []
  let finalK8Pipeline = []
  for (let j = 0; j < dropdownList.dropdown.length; j++) {
    for (let i = 0; i < pipelines.length; i++) {
      if ((pipelines[i].kubernetes_release_type === 'stable') && (pipelines[i].arch === 'amd64')) {
        env = R.match(/Stable/, dropdownList['dropdown'][j].environment)
        if (env.length > 0) {
          arch = R.match(/Arm/, env.input)
          if (arch.length === 0) {
            finalK8Pipeline = R.mergeAll([{dropdown: dropdownList['dropdown'][j].environment}, pipelines[i]])
            finalTestEnvList.push(finalK8Pipeline)
          }
        }
      }
      if ((pipelines[i].kubernetes_release_type === 'head') && (pipelines[i].arch === 'amd64')) {
        env = R.match(/Head/, dropdownList['dropdown'][j].environment)
        if (env.length > 0) {
          arch = R.match(/Arm/, env.input)
          if (arch.length === 0) {
            finalK8Pipeline = R.mergeAll([{dropdown: dropdownList['dropdown'][j].environment}, pipelines[i]])
            finalTestEnvList.push(finalK8Pipeline)
          }
        }
      }
    }
    for (let i = 0; i < pipelines.length; i++) {
      if ((pipelines[i].kubernetes_release_type === 'stable') && (pipelines[i].arch === 'arm64')) {
        env = R.match(/Stable/, dropdownList['dropdown'][j].environment)
        if (env.length > 0) {
          arch = R.match(/Arm/, env.input)
          if (arch.length > 0) {
            finalK8Pipeline = R.mergeAll([{dropdown: dropdownList['dropdown'][j].environment}, pipelines[i]])
            finalTestEnvList.push(finalK8Pipeline)
          }
        }
      }
      if ((pipelines[i].kubernetes_release_type === 'head') && (pipelines[i].arch === 'arm64')) {
        env = R.match(/Head/, dropdownList['dropdown'][j].environment)
        if (env.length > 0) {
          arch = R.match(/Arm/, env.input)
          if (arch.length > 0) {
            finalK8Pipeline = R.mergeAll([{dropdown: dropdownList['dropdown'][j].environment}, pipelines[i]])
            finalTestEnvList.push(finalK8Pipeline)
          }
        }
      }
    }
  }
  return finalTestEnvList
}

var k8PipelineObj = function (releaseType, ref, sha, jobs, arch) {
  let obj = {}
  obj.kubernetes_release_type = releaseType
  obj.ref = ref
  obj.sha = sha
  obj.jobs = jobs
  obj.arch = arch
  return obj
}

export default {
  state,
  getters,
  actions,
  mutations
}
