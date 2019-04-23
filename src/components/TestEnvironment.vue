<template>
   <div class="container">
   <div id="test-environment" >
          <span class="test-env-label">Test environment</span>
          <div class="test-env-name" @click="openDialog('dialog1')">
            <div class="icon">
            <img :src="'https://raw.githubusercontent.com/cncf/artwork/master/kubernetes/icon/color/kubernetes-icon-color.svg?sanitize=true'" />
            </div>
            <div>
              Kubernetes &mdash; 
             {{ CurrentEnv(currentEnv) }}
            </div>
          <span class="mobile-test-env-dropdown"></span>
          </div>
          <div class="test-env-details">
              <div class="stage">Bare Metal (Packet)</div>
              <StatusLabel :url="ReleaseURL()" 
              :label="ReleaseStatus()"
              :branch="ReleaseBranch()"
             :class="ReleaseStatus()"/>
          </div>
       </div>
       <div id="test-environment-full">
          <span class="test-env-label">Test environment</span>
          <div class="test-env-name" v-on:click="gotoProjectURL()">
            <div class="icon">
            <img :src="'https://raw.githubusercontent.com/cncf/artwork/master/kubernetes/icon/color/kubernetes-icon-color.svg?sanitize=true'"
            />
            </div>
            <div>
              Kubernetes
            </div>
          </div>
          <div class="environment-divider dash">
          </div>
          <div>
            <md-select v-model="initialCurrentEnv" name="initialCurrentEnv" id="release-type" v-on:selected="selectEnv($event)" :placeholder="defaultEnv">
              <md-option v-for="(env, index) in testEnvs" :key="index" :value="env"> 
                <div :class="boldThisOption(env.dropdown)">{{ env.dropdown }}</div>
              </md-option>
            </md-select>
          </div>
          <div class="environment-divider">
              <i class="fa fa-arrow-right"></i>
          </div>

          <div class="stage">Bare Metal (Packet)</div>

          <div class="environment-divider">
              <i class="fa fa-arrow-right"></i>
          </div>
          <StatusLabel :url="ReleaseURL()" 
          :label="ReleaseStatus()"
          :branch="ReleaseBranch()"
         :class="ReleaseStatus()"/>
      </div>

      <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
        <md-dialog-title>Select K8s Environment</md-dialog-title>
        <md-dialog-content>
          <md-list>
              <md-list-item v-for="(env, index) in testEnvs" :key="index" :value="env" @click="closeDialog('dialog1', env)">
                <span>
                  {{ env.dropdown }}
                </span>
                <md-icon>{{ListIcon(env)}}</md-icon>
              </md-list-item>
          </md-list>
        </md-dialog-content>

        <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('dialog1')">Cancel</md-button>
        </md-dialog-actions>
      </md-dialog>
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
        initialCurrentEnv: this.$store.state.environments.current.dropdown
      }
    },
    props: {
      url: { type: String, default: '' },
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
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref, releaseType) {
        if (releaseType) {
          this.selectEnv(releaseType)
        }
        this.$refs[ref].close()
      },
      gotoURL () {
        window.open(this.$props.url, '_blank')
      },
      gotoProjectURL () {
        window.open(this.$props.project.url, '_blank')
      },
      selectEnv: function (releaseType) {
        let env = releaseType
        this.$store.dispatch('switchEnv', { env })
      },
      boldThisOption: function (dropdown) {
        if (dropdown === this.$store.state.environments.current.dropdown) {
          return 'boldSelector'
        } else {
          return 'doNotBoldSelector'
        }
      },
      SelectItems (items, releaseType) {
        var selectItems = [items[0]]
        items[0].release_type === releaseType ? selectItems.push(items[1]) : selectItems.unshift(items[1])
        return selectItems
      },
      ListIcon: function (type) {
        return type.kubernetes_release_type === this.$store.state.environments.current.kubernetes_release_type ? 'checked' : ''
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
      CurrentEnv: function (env) {
        return this.$store.state.environments.current.dropdown
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
      ...mapGetters({testEnvs: 'allTestEnvs', currentEnv: 'selectedEnv', defaultEnv: 'defaultEnv'})
    }
  }

</script>

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/mixins";

  $paddingLeft: calc(#{rem(35)} + #{rem(10)});

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
    &::before {
      width: calc(120px + 16px);
      background-color: white;

      @include mq('md') {
        width: calc(120px + 12px);
        left: 40px;
      }
    }

    .test-env-label {
         position: absolute;
         top: -8px;
         font-weight: 600;
         font-size: 14px;
         width: 120px;
         @include mq('md') {
           left: 46px;
         }
     }
     .test-env-name, .test-env-details {
         display: flex;
         justify-content: center;
     }
     .test-env-name {
         align-items: center;
         font-weight: 700;
         @include mq('sm') {
             padding-bottom: 20px;
         }
     }
     etest-env-details {
         font-size: rem(14);
         align-items: center;
     }
  }

  #test-environment {
    display: flex;
    border-radius: 5px;

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

    .test-env-name {
        cursor: pointer;
    }
  }

  #test-environment-full {
    margin: auto;
    box-sizing: border-box;
    padding: 20px rem(35);
    display: none;
    border-radius: 3px;
    > div {
      flex: 1;
    }
    .test-env-name {
      justify-content: initial;
      padding: 0 rem(10);
      cursor: pointer;
    }
    .environment-divider {
      &.dash {
        position: relative;
        width: 100px;
        flex: initial;
        &::before {
          position: absolute;
          content: '';
          border-top: solid 2px #707070;
          width: 80px;
          top: 50%;
          left: 10px;
        }
      }

      .fa.fa-arrow-right {
        color: #707070;
        font-weight: 400;
      }
    }
 
    .icon {
       width: rem(35);
       height: rem(35);
       padding-right: 10px;
       img {
         width: inherit;
       }
    }
    @include mq('md') {
      display: flex;
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
      margin-bottom: 0;
    }
  }
  .md-theme-default.md-select-content .md-menu-item.md-selected {
    > div > span {
      color: $black;
      font-weight: 700;
    }
  }
  .md-dialog-title.md-title {
    font-weight: 900;
  }
  .md-dialog-content {
    padding: 0;
  }
  .md-select-content {
    display: none;
    @include mq('md') {
      display: block;
      min-width: 150px;
      width: calc((100% / 7.3) + 50px);
    }
 }

   li.md-list-item {
     box-sizing: border-box;
     &.md-menu-item.md-option:first-of-type {
       position: relative;
       &::after {
        color: rgba(0, 0, 0, .38);
        margin-top: 2px;
        position: absolute;
        top: 50%;
        right:  5%;
        transform: translateY(-50%) scaleY(0.45) scaleX(0.85);
        transition: all 0.15s linear;
        content: "\25B2";
        @include mq('md') {
          right: 2%;
        }
        @include mq('lg') {
          right: 10px;
        }
      }
    }
  }
     #test-environment {
     box-sizing: border-box;
       position: relative;
        &::after {
        color: rgba(0, 0, 0, .38);
        margin-top: 2px;
        position: absolute;
        top: 25%;
        right:  2%;
        transform: translateY(-50%) scaleY(0.45) scaleX(0.85);
        transition: all 0.15s linear;
        content: "\25BC";
        @include mq('md') {
          right: 2%;
        }
        @include mq('lg') {
          right: 10px;
        }
      }
     }
      .doNotBoldSelector {
        font-weight: 200;
      }
      .boldSelector {
        font-weight: 900;
      }
      .md-select .md-select-value {
        font-size: 14px;
      }

</style>
