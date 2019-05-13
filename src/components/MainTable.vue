<template>
  <div id="main-table">
    <div class="container">
      <table>
        <thead>

          <tr class="header">
            <th>Project</th>
            <th>Release</th>
            <th>Build</th>
            <th :colspan="clouds.length">Deploy</th>
            <th>Test</th>
          </tr>

        </thead>

        <tbody>
          <tr v-for="project in projects" :key="project.order" v-on:click="$event.currentTarget.classList.toggle('open')">
            <td class="project-column">
              <div class="project-box">

                <ProjectFlag
                  :url="project.url"
                  :icon="project.icon"
                  :title="project.display_name"
                  :caption="project.caption"/>

                <img class="pipe-gfx" src="../assets/images/pipe-gfx.svg">
              </div>
            </td>

            <td class="release-column">
              <MetaLabel :branch="StableBranchName(project)" :label="StableReleaseTag(project)" :url="StableReleaseURL(project)" :class="StableStatus(project)"/>
              <MetaLabel :branch="HeadBranchName(project)" :label="HeadReleaseTag(project)" :url="HeadReleaseURL(project)" :class="HeadStatus(project)"/>
            </td>

            <td class="build-column top">

              <div class="build-links mobile-only">
                <span><a target="_blank"></a></span>
                <span class="bold"><a target="_blank" :href="StableReleaseURL(project)">Stable <i class="fa fa-external-link" aria-hidden="true"></i></a></span>
                <span class="bold"><a target="_blank" :href="HeadReleaseURL(project)">Head <i class="fa fa-external-link" aria-hidden="true"></i></a></span>
              </div>

              <div class="build-details">
                <label class="mobile-label bold">Build</label>
                <StatusBadge :state="StableStatus(project)" :url="StableURL(project)"/>
                <StatusBadge :state="HeadStatus(project)" :url="HeadURL(project)"/>
              </div>

            </td>
            <td class="build-column" v-for="deployment in clouds">
              <div class="deployment-details">
                <label class="mobile-label bold">Deploy</label>
                <StatusBadge :state="StableCloudStatus(project, deployment.cloud_id)" :url="StableCloudURL(project, deployment.cloud_id)"/>
                <StatusBadge :state="HeadCloudStatus(project, deployment.cloud_id)" :url="HeadCloudURL(project, deployment.cloud_id)"/>
              </div>
            </td>

            <td class="build-column">
              <div class="deployment-details">
                <label class="mobile-label bold">Test</label>
                <StatusBadge state='N/A' url='#'/>
                <StatusBadge state='N/A' url='#'/>
              </div>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
  import array from '../lib/Array'
  import ProjectFlag from './ProjectFlag'
  import MetaLabel from './MetaLabel'
  import StatusBadge from './StatusBadge'
  import {mapGetters} from 'vuex'

  export default {
    name: 'main-table',
    components: {ProjectFlag, StatusBadge, MetaLabel},
    data: function () {
      return {
        demoStateTypes: ['success', 'running', 'failed', '', null]
      }
    },
    beforeDestroy: function () {},
    beforeMount: function () {},
    mounted: function () {
      const channel = this.$store.getters.socket.channel('dashboard:*', {})
      channel.on('new_cross_cloud_call', payload => {
        this.$store.dispatch('updateDashboard', { payload })
        let lastCheckDt = payload.reply.dashboard.last_check_dt
        this.$store.dispatch('updateNewTime', lastCheckDt)
        this.$forceUpdate()
      })
    },
    methods: {
      StableStatus: function (arg) {
        var status = 'N/A'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'stable') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.order === 1) { status = j.status }
                })
              }
            }
          }
        })

        console.log('stable status:' + status)
        return status
      },
      HeadStatus: function (arg) {
        var status = 'N/A'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'head') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.order === 1) { status = j.status }
                })
              }
            }
          }
        })
        console.log('head status:' + status)
        return status
      },
      StableURL: function (arg) {
        var url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'stable') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.order === 1) {
                    if (!(j.url === null)) {
                      url = j.url
                    }
                    if (j.url === null) {
                      url = '#'
                    }
                  }
                })
              }
            }
          }
        })
        return url
      },
      HeadURL: function (arg) {
        var url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'head') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.order === 1) {
                    if (!(j.url === null)) {
                      url = j.url
                    }
                    if (j.url === null) {
                      url = '#'
                    }
                  }
                })
              }
            }
          }
        })

        return url
      },
      StableReleaseURL: function (arg) {
        let url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'stable') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                if (pl.head_commit === 'N/A') {
                  url = '#'
                }
                if (!(pl.head_commit === 'N/A')) {
                  url = arg.repository_url + `/commit/${pl.head_commit}`
                }
              }
            }
          }
        })
        return url
      },
      HeadReleaseURL: function (arg) {
        let url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'head') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                if (pl.head_commit === 'N/A') {
                  url = '#'
                }
                if (!(pl.head_commit === 'N/A')) {
                  url = arg.repository_url + `/commit/${pl.head_commit}`
                  // var rturl = pl.kubernetes_release_type + ': ' + url
                  // console.log(rturl)
                }
              }
            }
          }
        })
        return url
      },
      StableReleaseTag: function (arg) {
        let ref = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'stable') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                ref = pl.ref
              }
            }
          }
        })

        return ref
      },
      HeadReleaseTag: function (arg) {
        let headCommit = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'head') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                headCommit = pl.head_commit
              }
            }
          }
        })

        return headCommit
      },
      HeadBranchName: function (arg) {
        let type = ''
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'head') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                type = pl.kubernetes_release_type
              }
            }
          }
        })
        return type
      },
      StableBranchName: function (arg) {
        let type = ''
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'stable') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                type = pl.kubernetes_release_type
              }
            }
          }
        })
        return type
      },
      HeadCloudStatus: function (arg, cloudId) {
        var status = 'N/A'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'head') {
              // console.log('Stable pipeline' + pl)
              // let jobs = pl.jobs
              // jobs.sort(function (a, b) {
              //   return a.order - b.order
              // })
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.cloud_id === cloudId) { status = j.status }
                })
              }
            }
          }
        })

        console.log('stable status:' + status)
        return status
      },
      StableCloudStatus: function (arg, cloudId) {
        var status = 'N/A'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'stable') {
              // console.log('Stable pipeline' + pl)
              // let jobs = pl.jobs
              // jobs.sort(function (a, b) {
              //   return a.order - b.order
              // })
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.cloud_id === cloudId) { status = j.status }
                })
              }
            }
          }
        })

        console.log('stable status:' + status)
        return status
      },
      HeadCloudURL: function (arg, cloudId) {
        var url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'head') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.cloud_id === cloudId) {
                    if (j.status === 'N/A') { url = '#' }
                    if (!(j.status === 'N/A')) { url = j.url }
                  }
                })
              }
            }
          }
        })
        return url
      },
      StableCloudURL: function (arg, cloudId) {
        var url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === 'stable') {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.cloud_id === cloudId) {
                    if (j.status === 'N/A') { url = '#' }
                    if (!(j.status === 'N/A')) { url = j.url }
                  // console.log('cloud name =' + cloudName)
                  // console.log('cloud id =' + j.cloud_id)
                  // console.log('real cloud id =' + cloudId)
                  // console.log('status=' + j.status)
                  // console.log('url =' + j.url)
                  }
                })
              }
            }
          }
        })
        return url
      }
    },
    computed: {
      // For Demo
      demoState1: function () {
        return array.random(this.demoStateTypes)
      },
      demoState2: function () {
        return array.random(this.demoStateTypes)
      },
      demoState3: function () {
        return array.random(this.demoStateTypes)
      },
      ...mapGetters({ projects: 'tableProjects', pipelines: 'allPipelines', clouds: 'allClouds', socket: 'socket', timer: 'updateTime', currentEnv: 'selectedEnv' })
    },
    created () {
      this.$store.dispatch('connectToSocket')
      this.$store.dispatch('getAllClouds')
    }
  }

</script>
