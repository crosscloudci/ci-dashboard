<template>
  <div id="main-table">
    <div class="container">
      <table>
        <thead>

          <tr class="header">
            <th>Project</th>
            <th>Build</th>
            <th>Release</th>
            <th colspan="6">Deployment</th>
          </tr>

          <tr class="subheader">
            <th></th>
            <th><span>Status</span></th>
            <th ><span>Stable Head</span></th>
            <th><span>AWS</span></th>
            <th><span>Azure</span></th>
            <th><span>Bluemix</span></th>
            <th><span>GCE</span></th>
            <th><span>GKE</span></th>
            <th><span>Packet</span></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in 3">
            <td class="project-column">
              <div class="project-box">

                <ProjectFlag
                  url="http://google.com"/>

                <div class="gfx">
                  <span class="half-circle"></span>
                  <span class="h-line"></span>
                </div>

              </div>
            </td>

            <td>
              <StatusBadge :state="demoState1" url="http://google.com"/>
              <StatusBadge :state="demoState2" url="http://google.com"/>
            </td>
            <td>
              <MetaLabel label="v1.87" url="http://google.com"/>
              <MetaLabel label="72jsbg" url="http://google.com"/>
            </td>
            <td>
              <StatusBadge :state="demoState3" url="http://google.com"/>
              <StatusBadge :state="demoState1" url="http://google.com"/>
            </td>
            <td>
              <StatusBadge :state="demoState2" url="http://google.com"/>
              <StatusBadge :state="demoState3" url="http://google.com"/>
            </td>
            <td>
              <StatusBadge :state="demoState1" url="http://google.com"/>
              <StatusBadge :state="demoState2" url="http://google.com"/>
            </td>
            <td>
              <StatusBadge :state="demoState3" url="http://google.com"/>
              <StatusBadge :state="demoState1" url="http://google.com"/>
            </td>
            <td>
              <StatusBadge :state="demoState2" url="http://google.com"/>
              <StatusBadge :state="demoState3" url="http://google.com"/>
            </td>
            <td>
              <StatusBadge :state="demoState1" url="http://google.com"/>
              <StatusBadge :state="demoState2" url="http://google.com"/>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
<ul>
    <li v-for="p in projects">
{{p}}
      <br>
    </li>
  </ul>
  </div>
</template>

<script>
import array from '../lib/Array'
import ProjectFlag from './ProjectFlag'
import MetaLabel from './MetaLabel'
import StatusBadge from './StatusBadge'
import {mapGetters, mapActions} from 'vuex'


export default {
  name: 'main-table',
  components: {ProjectFlag, StatusBadge, MetaLabel},
  data: function () {
    return {
      demoStateTypes: ['success', 'running', 'failed']
    }
  },
  created: function () {
    this.$store.dispatch('getAllProjects')
    },
  computed: {
   products: mapGetters({ projects: 'allProjects' }),
    // For Demo
    demoState1: function () {
      return array.random(this.demoStateTypes)
    },
    demoState2: function () {
      return array.random(this.demoStateTypes)
    },
    demoState3: function () {
      return array.random(this.demoStateTypes)
    }
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
    }
  }
</style>
