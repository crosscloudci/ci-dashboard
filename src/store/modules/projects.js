// import api from '../../api/api'
import * as types from '../mutation-types'
import * as R from 'ramda'

// initial state
const state = {
  projects: [],
  pipelines: []
}

// getters
const getters = {
  allProjects: state => state.projects,
  tableProjects: state => {
    console.log('these are the tableProjects', state.projects)
    const tableProjects = {}
    state.projects.forEach(function (stateProject, index) {
      const subProjectName = Object.keys(stateProject)[0]
      tableProjects[subProjectName] = stateProject[subProjectName]
    })
    return tableProjects
  }
// .filter((project) => { if (project['Graduated'] !== undefined) { project['Graduated'][0].display_name !== 'Kubernetes' } else { return true } })
  // tableProjects: state => state.projects.filter((project) => { debugger; project['Graduated'][0].display_name !== 'Kubernetes' })
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.RECEIVE_PIPELINES] (state, { projects }) {
    let currentProjects = state.projects.slice()
    // state.projects = []
    let orderedProjects = projects
    currentProjects.sort(function (a, b) {
      return a.order - b.order
    })
    orderedProjects.sort(function (a, b) {
      return a.order - b.order
    })
    let pipelines = []
    for (var i = 0; i < projects.length; i++) {
      if (!(JSON.stringify(currentProjects[i]) === JSON.stringify(orderedProjects[i]))) {
        console.log(JSON.stringify(currentProjects[i]) + 'was replaced by' + JSON.stringify(orderedProjects[i]))
        currentProjects.splice(i, 1, orderedProjects[i])
      }
      pipelines.concat(currentProjects.pipelines)
    }
    state.pipelines = pipelines
  },

  [types.RECEIVE_DASHBOARD_PROJECTS] (state, { projects, cncfRelations }) {
    let cncfStages = []
    let orderedRelations = sortProjectsAndRelations(cncfRelations)
    let orderedProjects = sortProjectsAndRelations(projects)

    // assigns projects to CNCF Relation objects
    let finalCNCFStages = assignProjectsToStages(cncfStages, orderedRelations, orderedProjects)
    state.projects = finalCNCFStages
  }
}

const sortProjectsAndRelations = (array) => {
  array.sort(function (a, b) {
    return a.order - b.order
  })
  return array
}

const assignProjectsToStages = (cncfStages, orderedRelations, orderedProjects) => {
  for (let i = 0; i < orderedRelations.length; i++) {
    // Returns a lens whose focus is the specified property.
    let lens = R.lensProp('name')
    // Returns a "view" of the given data structure, determined by the given lens. The lens's focus determines which portion of the data structure is visible.
    let name = R.view(lens, orderedRelations[i])
    cncfStages.push(name)
  }

  let newCNCFStages = R.zipObj(cncfStages, [[], [], []])
  var keys = R.keys(newCNCFStages)
  let cncfStagesArray = []
  let filteredCNCFStages

  for (let j = 0; j < keys.length; j++) {
    for (let i = 0; i < orderedProjects.length; i++) {
      if (keys[j] === orderedProjects[i].cncf_relation) {
        if (orderedProjects[i].display_name !== 'Kubernetes') {
          newCNCFStages[keys[j]].push(orderedProjects[i])
        }
      }
    }
    const hasProjects = (val, key) => val.length >= 1
    // pickBy returns partial subset of object that satisfies given espression
    // doing this to ensure that only CNCF stages with listed projects are returned to the frontend
    filteredCNCFStages = R.pickBy(hasProjects, newCNCFStages)
  }
  for (var prop in filteredCNCFStages) {
    if (filteredCNCFStages.hasOwnProperty(prop)) {
      let innerObj = {}
      innerObj[prop] = filteredCNCFStages[prop]
      cncfStagesArray.push(innerObj)
    }
  }
  return cncfStagesArray
}

export default {
  state,
  getters,
  actions,
  mutations
}
