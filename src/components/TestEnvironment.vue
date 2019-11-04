<template>
   <div class="container">
   <div id="test-environment" >
          <span class="test-env-label">Test environment</span>
          <div class="test-env-selection">
            <div class="sm-logo">
              <div class="icon">
                <img :src="'https://raw.githubusercontent.com/cncf/artwork/master/projects/kubernetes/icon/color/kubernetes-icon-color.svg?sanitize=true'" />
              </div>
              <div>
                Kubernetes
              </div>
            </div>
              <div class="sm-env-selection-radio-button-container">
                <md-radio class="md-primary md-flex" name="release-selection" v-model="currentEnvRelease" :mdValue="release.name" v-for="(release, index) in envReleases" :key="index" v-on:change="radioSelectEnv($event, 'release')">
                  {{ release.displayName }}
                </md-radio>
              </div>
          </div>
          <div class="test-env-selection">
            <div class="sm-logo">
              <div class="icon">
                <img :src="'https://raw.githubusercontent.com/cncf/artwork/master/projects/containerd/icon/color/containerd-icon-color.png'" />
              </div>
              <div>
                containerd
              </div>
            </div>
              <div class="sm-env-selection-radio-button-container">
                <md-radio v-model="containerdRelease" md-value="1.3.0"  class="md-primary md-flex"  name="containerd-release-selection">
                  containerd 1.3.0
                </md-radio>
                <md-radio v-model="containerdRelease" md-value="n/a"  class="md-primary md-flex" name="containerd-release-selection" disabled>
                  N/A
                </md-radio>
              </div>
          </div>
          <div class="test-env-selection">
            <div class="sm-logo">
              <div>
                Architecture
              </div>
            </div>
              <div class="sm-env-selection-radio-button-container">
                <md-radio class="md-primary md-flex" name="release-selection" v-model="currentEnvRelease" :mdValue="release.name" v-for="(release, index) in envReleases" :key="index" v-on:change="radioSelectEnv($event, 'release')">
                  {{ release.displayName }}
                </md-radio>
              </div>
          </div>
          <div class="test-env-details">
              <div class="stage">
                <img src='../assets/images/packet-logo.png' />
              </div>
              <StatusLabel :url="ReleaseURL()"
              :label="ReleaseStatus()"
              :branch="ReleaseBranch()"
             :class="ReleaseStatus()"/>
          </div>
       </div>
       <div id="test-environment-full">
          <span class="test-env-label">Test environment</span>
          <div class="kubernetes-env-selection">
            <div class="test-env-selection" v-on:click="gotoURL()">
              <div class="lg-logo">
                <div class="icon">
                  <img :src="'https://raw.githubusercontent.com/cncf/artwork/master/projects/kubernetes/icon/color/kubernetes-icon-color.svg?sanitize=true'" />
                </div>
                <div>
                  Kubernetes
                </div>
              </div>
            </div>
            <div class="med-env-selection-radio-button-container long-label">
              <md-radio class="md-primary md-flex" name="release-selection" v-model="currentEnvRelease" :mdValue="release.name" v-for="(release, index) in envReleases" :key="index" @change="radioSelectEnv($event, 'release')">
                {{ release.displayName }}
              </md-radio>
            </div>
          </div>
          <div class="environment-divider">
              <i class="fa fa-arrow-right"></i>
          </div>
          <div class="containerd-env-selection">
            <div class="test-env-selection" v-on:click="gotoURL()"> 
              <div class="lg-logo">
                <div class="icon">
                  <img :src="'https://raw.githubusercontent.com/cncf/artwork/master/projects/containerd/icon/color/containerd-icon-color.png'" />
                </div>
                <div>
                  containerd
                </div>
              </div>
            </div>
            <div class="med-env-selection-radio-button-container long-label">
              <md-radio v-model="containerdRelease" md-value="1.3.0"  class="md-primary md-flex"  name="containerd-release-selection">
                containerd 1.3.0
              </md-radio>
              <md-radio v-model="containerdRelease" md-value="n/a"  class="md-primary md-flex" name="containerd-release-selection" disabled>
                N/A
              </md-radio>
            </div>
          </div>
          <div class="environment-divider">
              <i class="fa fa-arrow-right"></i>
          </div>
          <div class="arch-env-selection">
            <p> Architecture</p>
            <div class="med-env-selection-radio-button-container">
              <md-radio class="md-primary" name="arch-selection" v-model="currentEnvArch" :mdValue="arch.name" v-for="(arch, index) in envArchs" :key="index" v-on:change="radioSelectEnv($event, 'arch')">
                {{ arch.displayName }}
              </md-radio>
            </div>
         </div>
          <div class="environment-divider">
              <i class="fa fa-arrow-right"></i>
          </div>

          <div class="stage">
            <a href="https://www.packet.com/" rel="noopener noreferrer" target="_blank">
              <img src='../assets/images/packet-logo.png' />
            </a>
          </div>

          <div class="environment-divider">
              <i class="fa fa-arrow-right"></i>
          </div>
          <StatusLabel :url="ReleaseURL()"
          :label="ReleaseStatus()"
          :branch="ReleaseBranch()"
         :class="ReleaseStatus()"/>
      </div>
    </div>
</template>


<script>
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import StatusBadge from './StatusBadge'
  import StatusLabel from './StatusLabel'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.css'
  import * as R from 'ramda'

  Vue.use(VueMaterial)

  export default {
    name: 'test-environment',
    components: { StatusLabel, StatusBadge },
    data: function () {
      return {
        currentEnvRelease: this.$store.state.environments.current.kubernetes_release_type || 'stable',
        currentEnvArch: this.$store.state.environments.current.arch || 'amd64',
        containerdRelease: '1.3.0'
      }
    },
    props: {
      url: { type: String, default: 'https://github.com/kubernetes/kubernetes/' },
      project: { type: Object }
    },
    mounted: function () {
      const channel = this.$store.getters.socket.channel('dashboard:*', {})
      channel.on('new_cross_cloud_call', payload => {
        this.$store.dispatch('updateTestEnv', { payload })
        this.$forceUpdate()
      })
    },
    methods: {
      gotoURL () {
        window.open(this.$props.url, '_blank')
      },
      gotoProjectURL () {
        window.open(this.$props.project.url, '_blank')
      },
      radioSelectEnv: function (newValue, typeOfNewValue) {
        let selectedRelease = this.currentEnvRelease
        let selectedArch = this.currentEnvArch

        if (typeOfNewValue === 'release') {
          selectedRelease = newValue
        } else {
          selectedArch = newValue
        }

        const env = this
          .testEnvs
          .filter(tEnv => tEnv.kubernetes_release_type === selectedRelease && tEnv.arch === selectedArch)[0]
        this.$store.dispatch('switchEnv', { env })
      },
      SelectItems (items, releaseType) {
        var selectItems = [items[0]]
        items[0].release_type === releaseType ? selectItems.push(items[1]) : selectItems.unshift(items[1])
        return selectItems
      },
      ListIcon: function (type) {
        return ((type.kubernetes_release_type === this.$store.state.environments.current.kubernetes_release_type) && (type.arch === this.$store.state.environments.current.arch)) ? 'checked' : ''
      },
      ReleaseType: function () {
        return this.$store.state.environments.current.kubernetes_release_type.toUpperCase() + this.$store.state.environments.current.kubernetes_release_type.substring(1)
      },
      ReleaseStatus: function () {
        let status = 'N/A'
        const pred = R.where({
          order: R.equals(9)
        })
        for (let i = 0; i < this.$store.state.environments.current.jobs.length; i++) {
          if (pred(this.$store.state.environments.current.jobs[i])) {
            status = this.$store.state.environments.current.jobs[i].status
          }
        }
        return status
      },
      ReleaseBranch: function () {
        let status = 'N/A'
        status = this.$store.state.environments.current.kubernetes_release_type
        return status
      },
      ReleaseURL: function () {
        var url = '#'
        const pred = R.where({
          order: R.equals(9)
        })
        for (let i = 0; i < this.$store.state.environments.current.jobs.length; i++) {
          if (pred(this.$store.state.environments.current.jobs[i])) {
            url = this.$store.state.environments.current.jobs[i].url
            return url
          }
        }
      },
      ReleaseTag: function () {
        let tag = '#'
        let releaseType = this.$store.state.environments.current.kubernetes_release_type
        let sha = this.$store.state.environments.current.sha
        let ref = this.$store.state.environments.current.ref
        tag = releaseType === 'head' ? sha.substring(0, 7) : releaseType === 'stable' ? ref : '#'
        return tag
      }
    },
    computed: {
      ...mapGetters({testEnvs: 'allTestEnvs', envReleases: 'selectableTestEnvReleases', envArchs: 'selectableTestEnvArch', currentEnv: 'selectedEnv', defaultEnv: 'defaultEnv'})
    }
  }

</script>

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/mixins";

  $paddingLeft: calc(#{rem(35)} + #{rem(10)});
      $hoverColor: #F7F7F7;
      $transparency: 0.12;

  #dashboard-header {
    @include flex-container;
    padding: rem(40) 0;
    padding-bottom: 3px;

    @include mq('sm'){ margin-top: 0; }

    #dashboard-logo,
    #dashboard-title { @include fbox(1); }

    #dashboard-logo {

      .cncf-logo {
        width: rem(260);
        cursor: pointer;
        img { width: inherit; }
      }

      @include mq('sm'){
        .cncf-logo { width: rem(180) }
      }
    }

    #dashboard-title {
      text-align: right;
      font-size: rem(24);

     @include mq('sm') { display: none; }

      span.title { text-transform: uppercase; font-weight: bold; }
    }

    @include mq('sm') {
      flex-wrap:wrap;
      padding: rem(20) 0;

      #dashboard-title {
        text-align: left;
        margin: rem(20) 0 0 0;
        font-size: rem(18);
      }

    }
  }

  #test-environment, #test-environment-full {
     align-content: space-around;
     align-items: center;
     background: #FDFDFD;
     border: solid #E5E5E5;
     border-width: 1px;
     flex-direction: column;
     justify-content: space-around;
     margin: 0 15px 20px 15px;
     position: relative;
     text-align: center;
     padding: 20px;

      @include mq('md') {
          flex-direction: row;
      }

     &::after, &::before {
   //   background-color: #E5E5E5;
      content: '';
    //  width: calc((100% - 120px)/ 2 - 8px);
      position: absolute;
      top: -1px;
      height: 1px;
    }
    &::after {
      right: 0;
      @include mq('md') {
         width: calc(100% - 120px - 12px - 40px);
      }
    }

    .test-env-label {
         background-color: white;
         position: absolute;
         top: -10px;
         font-weight: 600;
         font-size: 14px;
         width: 124px;
         @include mq('md') {
           left: 40px;
         }
     }
     .test-env-selection {
        align-items: center;

      .sm-logo, .lg-logo {
         display: flex;
         align-items: center;
         font-weight: 700;

         @include mq('sm') {
           justify-content: center;
         }

         .icon{
           margin-top: -3px;
         }
      }
     }

     .test-env-details {
         display: flex;
         width: 300px;
         font-size: rem(14);
         align-items: center;
         position: absolute;
         bottom: -12px;

         .stage, .status-label {
            background-color: white;
         }
         .stage {
           width: 150px ;
         }
         .status-label {
           margin-left: 36px;
           width: 100px;
         }
     }
  }

  #test-environment {
    display: flex;
    border-radius: 5px;
    width:90%;

    @include mq('md') {
      display: none;
    }

    .icon {
      width: rem(35);
      position: relative;

      @include mq('sm') {
        width: 1rem;
        margin-right: 5px;
      }

      img { width: inherit; }
    }

    .test-env-selection {
        cursor: pointer;
    }
    .stage img {
      height: rem(25);
    }
  }

  #test-environment-full {
    margin: auto;
    box-sizing: border-box;
    padding: rem(20) rem(10);
    display: none;
    @include mq('md') {
      display: flex;
    }
    border-radius: 3px;

    .test-env-label {
      //left: 20px;
    }

    .test-env-selection {
      justify-content: initial;
      cursor: pointer;
      margin-bottom:rem(20);
    }

    .environment-divider {
      //NOTE: this is code for old dash in desktop ui remove if no longer needed
      height: rem(90);
      flex-direction: column;
      display: flex;

      .dash {
          position: relative;
          border-top: solid 2px #707070;
          width: 40px;
          top: 50%;
      }

      .fa.fa-arrow-right {
        color: #707070;
        font-weight: 400;
      }
    }

    .icon {
       width: rem(40);
       padding-right: 10px;
       img {
         width: inherit;
       }
    }

    .lg-logo{
      margin-left: -3px;
      font-size:16px;
    }

    
    .arch-env-selection{
      p {
        font-size: 16px;
        font-weight: 700;
        margin:0 0 rem(20) 0;
      }
    }

    .stage {
      height: rem(100);
      width: 125px;
      
      img {
        margin-top: -6px;
        width: rem(75);
      }
    }

    .status-label {
      height: rem(90);
    }
  }

  .container {
    @include mq('sm') {
      @include flex-container;
      align-items: baseline;
      align-content: stretch;
    }
    #dashboard-header {
      @include mq('sm') {
        @include fbox(1);
        font-size: rem(14);
      }
    }

    #dashboard-updated {
      @include mq('sm') {
        text-align: right;
        position: relative;
        top: -6px;

        .icon { display: none; }
        .updated-label,
        .time-updated {
          display: block;
          text-align: right;
        }
      }
    }
  }
  .container {
    justify-content: center;
    padding-top: 20px;
  }
  #test-environment {
    @include mq('sm') {
      background: #FDFDFD;
    }
  }

     #test-environment {
     box-sizing: border-box;
       position: relative;
     }

    //TODO: all of these styles that override the default theme should be moved to their own theme and integrated that way
    .md-theme-default.md-radio.md-primary.md-checked .md-radio-container{
      border-color: #707070;
      &:after {
        background-color: #707070;
      }
    }

    .med-env-selection-radio-button-container {
      display: flex;
      flex-direction: column;
      text-align: left;

      .md-radio {
        flex:1 auto;
        margin: 0px 0px 8px 0;
      }

      .md-radio.md-checked {
        font-weight: bold;
      }
    }


    .med-env-selection-radio-button-container.long-label .md-radio label {
      min-width: 7rem;
    }

   .sm-env-selection-radio-button-container {
     display: flex;
       margin-top: 12px;
       justify-content: center;

        .md-radio {
          text-align: center;
          border: 1px solid #E9E9E9;
          padding: 8px 12px 8px 12px;
          margin: 0;
          border-radius: 24px 0 0 24px;
          min-width: 10rem;

          .md-radio-label{
            flex:auto;
          }

          &:last-child{
            flex-direction: row-reverse;
            border-radius: 0 24px 24px 0;

            .md-radio-label{
              padding-right: 8px;
            }
          }
        }

        .md-radio.md-checked {
          border: 1px solid #9A9A9A;
          font-weight: bold;
        }

   }
</style>
