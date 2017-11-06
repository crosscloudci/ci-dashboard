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
            <th ><span>Stable Head</span></th>
            <th  v-for="cloud in clouds">
              <span>{{cloud.name}}</span>
            </th>
            <th><span>Azure</span></th>
            <th><span>Bluemix</span></th>
            <th><span>GCE</span></th>
            <th><span>GKE</span></th>
            <th><span>Packet</span></th>
          </tr>
        </thead>

        <tbody>
          <!-- <tr v-for="project in this.$props.projects"> -->
          <tr v-for="project in projects">
            <td class="project-column">
              <div class="project-box">

                <ProjectFlag
                  :url="project.url"
                  :icon="project.icon"
                  :title="project.title"
                  :caption="project.caption"/>

                <div class="gfx">
                  <span class="half-circle"></span>
                  <span class="h-line"></span>
                </div>

              </div>
            </td>

            <td class="build-column">
              <label>Build Status</label>
              <StatusBadge :state="demoState1" url="https://gitlab.cncf.ci/kubernetes/kubernetes/-/jobs/25754"/>
              <StatusBadge :state="demoState2" url="http://github.com/cncf/cross-cloud"/>
            </td>
            <td class="release-column">
              <MetaLabel label="v1.8.2" url="https://github.com/kubernetes/kubernetes/commit/bdaeafa71f6c7c04636251031f93464384d54963" :class="[demoState1, respondToBrowser]"/>
              <MetaLabel label="1f53329" url="https://github.com/kubernetes/kubernetes/commit/1f53329c674e427264546247da1ae35c0826cbfd" :class="[demoState3, respondToBrowser]"/>
            </td>

            <td class="deployment-column" v-for="deployment in project.deployments">
              <label>{{deployment}}</label>
              <StatusBadge :state="demoState3" url="https://gitlab.cncf.ci/cncf/cross-cloud/-/jobs/25463"/>
              <StatusBadge :state="demoState1" url="http://google.com"/>
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
//  import {mapGetters, mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'main-table',
  components: {ProjectFlag, StatusBadge, MetaLabel},
  // props: ['projects'],
  data: function () {
    return {
      demoStateTypes: ['success', 'running', 'failed'],
      windowWidth: 0,
      scrolled: false
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.getWindowWidth)
    window.removeEventListener('scroll', this.handleScroll)
  },
  beforeMount: function () {
    // this.$store.dispatch('connectToChannel', this.session)
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
    toggleDeploymentPane (event) {
      this.isOpen = !this.isOpen
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

    table {
      width: 100%;
      // border-collapse: collapse;

      @include mq('sm') {
        width: auto;
        thead { display: none; }
        tbody td { display: block; }
      }

      thead tr.header {
        @include border-radius;
        text-align: left;
        background: $blue;

        th {
          padding: rem(10);
          color: $white;
          text-align: center;
        }
      }

      thead tr.subheader {
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
            top: rem(15);
            width: 100%;

            @include mq('lg') { border-bottom: 1px solid $ccc; }
          }

          &:last-child:before {
            border:0;
          }

          span {
            background: $white;
            display: block;

          }
        }
      }

      tbody tr td {
        border-bottom:1px solid $ccc;
        padding: rem(10) 0;

        label { display: none; }

        @include mq('sm') { border-bottom: none; }
        &:first-child { @include mq('sm') { border-bottom: 1px solid $ccc; } }
      }

      tbody .project-box {
        position: relative;

        .gfx {
          visibility: hidden;
          @include mq('lg') { visibility: visible; }
          position: absolute;
          top: 0;
          right: rem(-90);
          z-index: -1;

          .half-circle {
            display: block;
            width: rem(100);
            height: rem(50);
            @include border-radius($round);
            border-top: 1px solid $ccc;
            border-bottom: 1px solid $ccc;
            border-left: 1px solid $ccc;
          }

          .h-line {
            display: block;
            width: rem(20);
            height: 1px;
            border-bottom: 1px solid $ccc;
            top: rem(25);
            left: rem(-20);
            position: inherit;
          }
        }
      }

      tbody tr td .status-badge,
      tbody tr td .meta-label {
        margin: auto;
        margin-bottom: rem(10);
      }

      tbody tr td .meta-label { text-align: center; }
    }
  }
  @include mq('sm') {
    #main-table {
      margin-top: 0;
      overflow: hidden;
    }

    #main-table table {
      width: 100%;
      display: block;

      tbody {
        display: block;

        tr {
          width: 100%;
          display: block;
          position: relative;

          td.release-column {
            position: absolute;
            top: rem(5);
            right: rem(5);

            .meta-label {
              display: inline-block;
              margin-bottom: 0;
            }
          }

          td.deployment-column,
          td.build-column {
            @include flex-container;
            background: $light;
            padding: rem(20);
            // display: none;

            label,
            .status-badge {
              @include fbox(0);
            }

            label {
              display: inline-block;
              @include fbox(1);
            }

            .status-badge {
              width: rem(10);
              height: rem(10);
              padding: 0;
              margin: 0 rem(10);
              display: inline-block;
              text-align: right;
              span.icon,
              span.label {
                display: none;
              }
            }
          }
        }
      }
    }
  }


  .fixed {
    background: red;
    position: fixed;
    left: 0;
    width: 100%;
  }
</style>
