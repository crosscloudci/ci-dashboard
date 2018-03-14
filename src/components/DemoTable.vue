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
        return this.demoState(this.$route.path)
      },
      HeadStatus: function (arg) {
        return this.demoState(this.$route.path)
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
        return this.demoState(this.$route.path)
      },
      StableCloudStatus: function (arg, cloudId) {
        return this.demoState(this.$route.path)
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
      demoState: function (path) {
        if (path === '/success' || path === '/success/') {
          return 'success'
        } else {
          return 'running'
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

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/variables";
  @import "../assets/stylesheets/mixins";

  #main-table {
    margin-top: rem(20);
    position: relative;

    @include mq('sm') {
      margin-top: 0;
      overflow: hidden;
    }

    table {
      width: 100%;
      border-spacing: 0;
      border-collapse: collapse;

      @include mq('sm') {
        width: 100%;
        display: block;
      }

      thead {
        @include mq('sm') { display: none; }

        tr {

          th {
            padding: rem(10);
            text-align: left;
          }

          &.header {
            text-align: left;
            background: $blue;
            color: $white;

            th:first-child {
              @include border-radius(15px 0 0 15px);
              text-indent: rem(50);
            }
            th:last-child {
              @include border-radius(0 15px 15px 0);
            }

            th:nth-child(2) {
              text-indent: rem(20);
            }
            th:nth-child(3) {
              text-indent: rem(50);
            }
            th:nth-child(4) {
              text-indent: rem(20);
            }
          }

          &.subheader {

            th {
              text-align: left;
              position: relative;

              &:before {
                content: '';
                display: block;
                position: absolute;
                height: 1px;
                z-index: -1;
                top: rem(25);
                width: 100%;
                @include mq('lg') { border-bottom: 1px solid $ccc; }
              }

              // &:last-child {
              //   text-indent: 0;
              //   padding-left: rem(30);
              // }

              &:last-child:before { border:0; }
              &:nth-child(3) {

                span {
                  padding-bottom: rem(5);
                  position: relative;
                  left: rem(24);
                }
              }

              span {
                background: $white;
                display: block;
                font-size: rem(11);
                padding-left: rem(21);
                width: rem(70);
              }
            }
          }
        }
      }

      tbody {
        @include mq('sm') { display: block; }

        tr {

          @include mq('sm') {
            width: 100%;
            display: block;
            position: relative;
          }

          td {
            border-bottom:1px solid $ccc;
            padding: rem(10) 0;

            @include mq('sm') { display: block; }

            label { display: none; }

            @include mq('sm') { border-bottom: none; }

            &:first-child {
              @include mq('sm') {
                border-bottom: 1px solid $ccc;
              }
            }

            &.project-column {

              .project-box {
                position: relative;

                .pipe-gfx {
                  position: absolute;
                  top: rem(-15);
                  right: rem(-40);
                  width: rem(80);
                  height: rem(80);
                }

                @include mq('sm') {
                  .pipe-gfx { display: none; }
                  .project-flag {
                    .click-zone {
                      top: rem(50);
                      width: 25%;
                      display: none;
                    }
                  }
                }
              }
            }

            &.build-column {
              @include mq('sm') {
                @include flex-container;
                background: $light;

                padding: rem(10) rem(5);
                padding-right: rem(20);
                display: none;

                &:last-child {border-bottom: 1px solid $ccc;}
              }

              .build-details,
              .deployment-details {
                position: relative;
                left: rem(10);
                @include mq('sm') {
                  @include flex-container;
                  justify-content: flex-end;
                }
                .status-badge {
                  min-width: rem(70);
                }
              }

              .build-details {
                @include mq('sm') {
                  border-top: 1px solid $ccc;
                  border-bottom: 1px solid $ccc;
                  padding-top: rem(20);
                  padding-bottom: rem(10);
                }
              }

              .deployment-details {
                @include mq('sm') {
                  label {
                    margin-top: rem(5)
                  }
                }
              }

              .build-links {
                @include mq('sm') {
                  @include flex-container;
                  padding: rem(10) 0;
                  margin-bottom: rem(10);
                  margin-left: rem(10);
                  justify-content:flex-end;

                  span {
                    @include fbox(1);
                    a {
                      text-decoration: none;
                      color: $black;
                      display: block;
                    }
                    &:first-child {
                      width: 100%;
                    }
                    &:nth-child(2) {
                      text-align: center;
                      width: rem(120);

                    }
                    &:nth-child(3) {
                      text-align: center;
                      width: rem(120);
                      margin-left: rem(10)
                    }
                  }
                }
              }

              label {
                @include mq('sm') {
                  display: block;
                  width: 100%;
                }
              }

              .status-badge {
                margin-left: rem(20);
                margin-bottom: rem(10);

                @include mq('sm') {
                  display: inline-block;
                  width: rem(70);
                  margin: 0 0 0 rem(5);
                }

              }

              label,
              .status-badge {
                @include mq('sm') {
                  @include fbox();
                }
              }
            }


            &.release-column {

              @include mq('md') {
                position: relative;
                left: rem(55);
              }

              @include mq('sm') {
                position: absolute;
                top: rem(9);
                right: rem(5);
              }

              @include mq('lg') {
                position: relative;
                left: 0;
              }

              .meta-label {
                margin: auto;
                margin-bottom: rem(10);
                text-align: left;

                @include mq('lg') {
                  text-indent: rem(55);
                }
                @include mq('sm') {
                  display: inline-block;
                  margin-bottom: 0;
                  width: rem(76);
                  text-align: left;
                  i.fa { margin-right: rem(5) }

                  .click-zone {
                    top: rem(50);
                    width: rem(75);
                    display: none;
                  }
                }
              }
            }
          }

          &.open {

            td.release-column
            .meta-label
            .click-zone { display: none; }

            td.project-column
            .project-box
            .project-flag
            .click-zone { display: none; }

            td.build-column {
              display: block;

              @include mq('sm') {
                &.top {
                  @include shadow(inset 0 1px 1px 0 $ccc);
                }

                .build-details .status-badge {
                  top: rem(-5);
                }
              }

              @include mq('lg') {
                display: table-cell;
              }
              @include mq('md') {
                display: table-cell;
              }
            }
          }
        }
      }
    }
  }
</style>
