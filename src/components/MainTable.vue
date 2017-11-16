<template>
  <div id="main-table">
    <div class="container">
      <table>
        <thead>

          <tr class="header">
            <th>Project</th>
            <th>Build</th>
            <th>Release</th>
            <th colspan="6">Deployments</th>
          </tr>

          <tr class="subheader">
            <th></th>
            <th><span>Status</span></th>

            <th ><span>Stable<br/>Head</span></th>

            <th v-for="cloud in clouds"><span>{{cloud.cloud_name}}</span></th>

          </tr>
        </thead>

        <tbody>
          <!-- <tr v-for="project in this.$props.projects"> -->
          <tr v-for="project in projects" v-on:click="$event.currentTarget.classList.toggle('open')">
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

            <td :class="['build-column', isOpen? 'open' : '' ]">

              <div class="build-links mobile-only">
                <span>Github <i class="fa fa-external-link-square" aria-hidden="true"></i></span>
                <span>Stable <i class="fa fa-external-link-square" aria-hidden="true"></i></span>
                <span>HEAD <i class="fa fa-external-link-square" aria-hidden="true"></i></span>
              </div>

              <div class="build-details">
                <label>Build Status</label>
                <StatusBadge :state="demoState1" url="https://gitlab.cncf.ci/kubernetes/kubernetes/-/jobs/25754"/>
                <StatusBadge :state="demoState2" url="http://github.com/cncf/cross-cloud"/>
              </div>

            </td>
            <td class="release-column">
              <MetaLabel label="v1.8.2" url="https://github.com/kubernetes/kubernetes/commit/bdaeafa71f6c7c04636251031f93464384d54963" :class="[demoState1, respondToBrowser]"/>
              <MetaLabel label="1f53329" url="https://github.com/kubernetes/kubernetes/commit/1f53329c674e427264546247da1ae35c0826cbfd" :class="[demoState3, respondToBrowser]"/>
            </td>

            <td class="build-column" v-for="deployment in clouds">
              <div class="deployment-details">
                <label>{{deployment}}</label>
                <StatusBadge :state="demoState3" url="https://gitlab.cncf.ci/cncf/cross-cloud/-/jobs/25463"/>
                <StatusBadge :state="demoState1" url="http://google.com"/>
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
        demoStateTypes: ['success', 'running', 'failed', '', null],
        windowWidth: 0,
        scrolled: false,
        isOpen: false
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.getWindowWidth)
      window.removeEventListener('scroll', this.handleScroll)
    },
    beforeMount: function () {
    },
    mounted: function () {
      this.$nextTick(function () {
        window.addEventListener('resize', this.getWindowWidth)
        window.addEventListener('scroll', this.handleScroll)
        this.getWindowWidth()
      })
    },
    methods: {
      getWindowWidth (event) {
        this.windowWidth = document.documentElement.clientWidth
      },

      handleScroll (event) {
        this.scrolled = window.scrollY > 0
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
      respondToBrowser: function () {
        if (this.windowWidth <= '639') {
          return 'mobile'
        } else {
          return ''
        }
      },
      ...mapGetters({ projects: 'allProjects', pipelines: 'allPipelines', clouds: 'allClouds' })
    },
    created () {
      this.$store.dispatch('connectToSocket')
      // this.$store.dispatch('getAllProjects')
      this.$store.dispatch('getAllClouds')
      // this.$store.dispatch('getAllPipelines')
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
            text-align: left;

            th {
              padding: rem(10);
              text-align: center;
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

              &:last-child:before { border:0; }

              span {
                background: $white;
                display: block;
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
            &:first-child { @include mq('sm') { border-bottom: 1px solid $ccc; } }

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
                padding: rem(10);
                display: none;
              }

              .build-details,
              .deployment-details {
                @include mq('sm') {
                  @include flex-container;

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

                }
              }

              .build-links {
                @include mq('sm') {
                  @include flex-container;
                  padding: rem(10) 0;
                  margin-bottom: rem(10);
                  span {
                    @include fbox(1);
                    &:first-child { width: 55% }
                    &:nth-child(2) { width: rem(75) }
                    &:nth-child(3) { width: rem(75) }
                  }
                }
              }

              label {
                @include mq('sm') {
                  display: block;
                  width: 60%;
                }
              }

              .status-badge {
                margin: auto;
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

              @include mq('sm') {
                position: absolute;
                top: rem(5);
                right: rem(5);
              }

              .meta-label {
                margin: auto;
                margin-bottom: rem(10);
                text-align: center;

                @include mq('sm') {
                  display: inline-block;
                  margin-bottom: 0;
                  width: rem(75);
                  text-align: left;

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
            .click-zone { display: block; }

            td.project-column
            .project-box
            .project-flag
            .click-zone { display: block; }

            td.build-column {
              display: block;

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
