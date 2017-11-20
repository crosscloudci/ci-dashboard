import api from '../../api/api'
import * as types from '../mutation-types'

// initial state
const state = {
  projects: [],
  pipelines: []
}

// getters
const getters = {
  allProjects: state => state.projects
}

// actions
const actions = {
  getAllProjects ({ commit }) {
    api.getDashboard().then((response) => {
      let projects = response.data.dashboard.projects
      commit(types.RECEIVE_DASHBOARD_PROJECTS, { projects })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PIPELINES] (state, { projects }) {
    let currentProjects = state.projects.slice()
    // state.projects = []
    let newProjects = projects
    currentProjects.sort(function (a, b) {
      return a.order - b.order
    })
    newProjects.sort(function (a, b) {
      return a.order - b.order
    })
    let pipelines = []
    for (var i = 0; i < projects.length; i++) {
      if (!(JSON.stringify(currentProjects[i]) === JSON.stringify(newProjects[i]))) {
        console.log(JSON.stringify(currentProjects[i]) + 'was replaced by' + JSON.stringify(newProjects[i]))
        currentProjects.splice(i, 1, newProjects[i])
      }
      pipelines.concat(currentProjects.pipelines)
    }
    state.pipelines = pipelines
    // for (var i = 0; i < projects.length; i++) {
    //   projects.forEach((arg) => {
    //     if (arg[name] === state.projects[i][name]) {
    //       let currentProject = state.projects[i]
    //       if (!(JSON.stringify(arg) === JSON.stringify(currentProject))) {
    //         newArray.splice(i, 1, arg)
    //       }
    //     }
    //   })
    //  // if (state.projects[i] == [projects]
    //   state.projects = newArray
    // }
  },
  [types.RECEIVE_DASHBOARD_PROJECTS] (state, { projects }) {
  // state.projects = Object.assign({}, state.projects, newGroups);
    state.projects = projects
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
