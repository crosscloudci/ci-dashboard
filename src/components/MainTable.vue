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
          <tr v-for="project in projects[0]['Graduated']" :key="project.order" v-on:click="$event.currentTarget.classList.toggle('open')">
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
              <MetaLabel :branch="BranchName(project, 'stable')" :label="ReleaseTag(project, 'stable')" :url="ReleaseURL(project, 'stable')"/>
              <MetaLabel :branch="BranchName(project, 'head')" :label="ReleaseTag(project, 'head')" :url="ReleaseURL(project, 'head')"/>
            </td>

            <td class="build-column top">

              <div class="build-links mobile-only">
                <span><a target="_blank"></a></span>
                <span class="bold"><a target="_blank" :href="ReleaseURL(project, 'stable')" v-on:click.stop >Stable <i class="fa fa-external-link" aria-hidden="true"></i></a></span>
                <span class="bold"><a target="_blank" :href="ReleaseURL(project, 'head')" v-on:click.stop>Head <i class="fa fa-external-link" aria-hidden="true"></i></a></span>
              </div>

              <div class="build-details">
                <label class="mobile-label bold">Build</label>
                <StatusBadge :state="BuildStatus(project, 'stable')" :url="BuildURL(project, 'stable')"/>
                <StatusBadge :state="BuildStatus(project, 'head')" :url="BuildURL(project, 'head')"/>
              </div>

            </td>
            <td class="build-column" v-for="deployment in clouds">
              <div class="deployment-details">
                <label class="mobile-label bold">Deploy</label>
                <StatusBadge :state="CloudStatus(project, 'stable', deployment.cloud_id)" :url="CloudURL(project, 'stable', deployment.cloud_id)"/>
                <StatusBadge :state="CloudStatus(project, 'head', deployment.cloud_id)" :url="CloudURL(project, 'head', deployment.cloud_id)"/>
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
  import ProjectFlag from './ProjectFlag'
  import MetaLabel from './MetaLabel'
  import StatusBadge from './StatusBadge'
  import {mapGetters} from 'vuex'

  export default {
    name: 'main-table',
    components: {ProjectFlag, StatusBadge, MetaLabel},
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
      BuildStatus: function (arg, branch) {
        var status = 'N/A'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === branch) {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.order === 1) { status = j.status }
                })
              }
            }
          }
        })
        return status
      },
      BuildURL: function (arg, branch) {
        var url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === branch) {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.order === 1) {
                    j.url === null ? url = '#' : url = j.url
                  }
                })
              }
            }
          }
        })
        return url
      },
      ReleaseURL: function (arg, branch) {
        let url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === branch) {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.head_commit === 'N/A' ? url = '#' : url = arg.repository_url + `/commit/${pl.head_commit}`
              }
            }
          }
        })
        return url
      },
      ReleaseTag: function (arg, branch) {
        let tag = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === branch) {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.release_type === 'stable' ? tag = pl.ref : tag = pl.head_commit
              }
            }
          }
        })
        return tag
      },
      BranchName: function (arg, branch) {
        let type = ''
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === branch) {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                type = pl.kubernetes_release_type
              }
            }
          }
        })
        return type
      },
      CloudStatus: function (arg, branch, cloudId) {
        var status = 'N/A'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === branch) {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.cloud_id === cloudId) { status = j.status }
                })
              }
            }
          }
        })

        return status
      },
      CloudURL: function (arg, branch, cloudId) {
        var url = '#'
        let env = this.$store.state.environments.current
        arg.pipelines.forEach(function (pl) {
          if (pl.arch === env.arch) {
            if (pl.release_type === branch) {
              if (pl.kubernetes_release_type === env.kubernetes_release_type) {
                pl.jobs.forEach(function (j) {
                  if (j.cloud_id === cloudId) {
                    j.status === 'N/A' ? url = '#' : url = j.url
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
      ...mapGetters({ projects: 'tableProjects', pipelines: 'allPipelines', clouds: 'allClouds', socket: 'socket', timer: 'updateTime', currentEnv: 'selectedEnv' })
    },
    created () {
      this.$store.dispatch('connectToSocket')
      this.$store.dispatch('getAllClouds')
    }
  }

</script>
