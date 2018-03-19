<template>
  <div id="main-table">
    <div class="container">
      <table>
        <thead>

          <tr class="header">
            <th>Project</th>
            <th>Build</th>
            <th>Release</th>
            <th :colspan="clouds.length">Deployments</th>
          </tr>

          <tr class="subheader">
            <th></th>
            <th><span>Status</span></th>
            <th><span>Stable</span><span>Head</span></th>
            <th v-for="cloud in clouds"><span>{{cloud.cloud_name}}</span></th>
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

            <td class="build-column top">

              <div class="build-links mobile-only">
                <span><a target="_blank" :href="project.url">GitHub <i class="fa fa-external-link-square" aria-hidden="true"></i></a></span>
                <span><a target="_blank" :href="StableReleaseURL(project)">Stable <i class="fa fa-external-link-square" aria-hidden="true"></i></a></span>
                <span><a target="_blank" :href="HeadReleaseURL(project)">Head <i class="fa fa-external-link-square" aria-hidden="true"></i></a></span>
              </div>

              <div class="build-details">
                <label>Build Status</label>
                <StatusBadge :state="StableStatus(project)" :url="StableURL(project)"/>
                <StatusBadge :state="HeadStatus(project)" :url="HeadURL(project)"/>
              </div>

            </td>
            <td class="release-column">
              <MetaLabel :branch="StableBranchName(project)" :label="StableReleaseTag(project)" :url="StableReleaseURL(project)" :class="StableStatus(project)"/>
              <MetaLabel :branch="HeadBranchName(project)" :label="HeadReleaseTag(project)" :url="HeadReleaseURL(project)" :class="HeadStatus(project)"/>
            </td>

            <td class="build-column" v-for="deployment in clouds">
              <div class="deployment-details">
                <label>{{deployment.cloud_name}}</label>
                <StatusBadge :state="StableCloudStatus(project, deployment.cloud_id)" :url="StableCloudURL(project, deployment.cloud_id)"/>
                <StatusBadge :state="HeadCloudStatus(project, deployment.cloud_id)" :url="HeadCloudURL(project, deployment.cloud_id)"/>
              </div>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
  import demodata from '../lib/demo-data.json'
  import ProjectFlag from './ProjectFlag'
  import MetaLabel from './MetaLabel'
  import StatusBadge from './StatusBadge'
  // import {mapGetters} from 'vuex'

  export default {
    name: 'main-table',
    components: {ProjectFlag, StatusBadge, MetaLabel},
    data: function () {
      return {
        projects: [],
        clouds: []
      }
    },
    beforeDestroy: function () {},
    beforeMount: function () {},
    mounted: function () {

    },
    methods: {
      StableStatus: function (arg) {
        return this.demoState(this.$route.path, arg)
      },
      HeadStatus: function (arg) {
        return this.demoState(this.$route.path, arg)
      },
      StableURL: function (arg) {
        var url = '#'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'stable') {
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
        })
        return url
      },
      HeadURL: function (arg) {
        var url = '#'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'head') {
            pl.jobs.forEach(function (j) {
              if (j.order === 1) {
                url = j.url
                // console.log(url)
              }
            })
          }
        })

        return url
      },
      StableReleaseURL: function (arg) {
        let url = '#'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'stable') {
            if (pl.head_commit === 'N/A') {
              url = '#'
            }
            if (!(pl.head_commit === 'N/A')) {
              url = arg.repository_url + `/commit/${pl.head_commit}`
              // var rturl = pl.release_type + ': ' + url
              // console.log(rturl)
            }
          }
        })
        return url
      },
      HeadReleaseURL: function (arg) {
        let url = '#'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'head') {
            if (pl.head_commit === 'N/A') {
              url = '#'
            }
            if (!(pl.head_commit === 'N/A')) {
              url = arg.repository_url + `/commit/${pl.head_commit}`
              // var rturl = pl.release_type + ': ' + url
              // console.log(rturl)
            }
          }
        })
        return url
      },
      StableReleaseTag: function (arg) {
        let ref = '#'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'stable') {
            ref = pl.ref
          }
        })

        return ref
      },
      HeadReleaseTag: function (arg) {
        let headCommit = '#'
        arg.pipelines.forEach(function (pl) {
          // debugger
          if (pl.release_type === 'head') {
            // debugger
            headCommit = pl.head_commit
          }
        })

        return headCommit
      },
      HeadBranchName: function (arg) {
        let type = ''
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'head') {
            type = pl.release_type
          }
        })
        return type
      },
      StableBranchName: function (arg) {
        let type = ''
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'stable') {
            type = pl.release_type
          }
        })
        return type
      },
      HeadCloudStatus: function (arg, cloudId) {
        return this.demoCloudState(this.$route.path, arg)
      },
      StableCloudStatus: function (arg, cloudId) {
        return this.demoCloudState(this.$route.path, arg)
      },

      HeadCloudURL: function (arg, cloudId) {
        var url = '#'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'head') {
            pl.jobs.forEach(function (j) {
              if (j.cloud_id === cloudId) {
                if (j.status === 'N/A') { url = '#' }
                if (!(j.status === 'N/A')) { url = j.url }
              }
            })
          }
        })
        return url
      },
      StableCloudURL: function (arg, cloudId) {
        var url = '#'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'stable') {
            pl.jobs.forEach(function (j) {
              if (j.cloud_id === cloudId) {
                if (j.status === 'N/A') { url = '#' }
                if (!(j.status === 'N/A')) { url = j.url }
              }
            })
          }
        })
        return url
      },
      demoCloudState: function (path, project) {
        if (path === '/build' || path === '/build/') {
          return 'success'
        }
        if ((path === '/provisioning' || path === '/provisioning/') && (project.display_name === 'Kubernetes')) {
          return 'running'
        }
        if ((path === '/provisioning' || path === '/provisioning/') && !(project.display_name === 'Kubernetes')) {
          return 'success'
        }
        if ((path === '/deploy' || path === '/deploy/') && !(project.display_name === 'ONAP')) {
          return 'success'
        }
        if ((path === '/deploy' || path === '/deploy/') && (project.display_name === 'ONAP')) {
          return 'running'
        }
        if (path === '/home' || path === '/home/') {
          return 'success'
        }
        if (path === '/success' || path === '/success/') {
          return 'success'
        }
      },
      demoState: function (path, project) {
        if (path === '/build' || path === '/build/') {
          if (project.display_name === 'ONAP') {
            return 'running'
          } else {
            return 'success'
          }
        }
        if (path === '/deploy' || path === '/deploy/') {
          return 'success'
        }
        if (path === '/provisioning' || path === '/provisioning/') {
          return 'success'
        }
        if (path === '/home' || path === '/home/') {
          return 'success'
        }
        if (path === '/success' || path === '/success/') {
          return 'success'
        }
      }
    },
    computed: { },
    created () {
      this.projects = demodata.dashboard.projects
      this.clouds = demodata.dashboard.clouds
    }
  }

</script>
