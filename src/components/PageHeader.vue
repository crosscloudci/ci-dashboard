<template>
  <div id="page-header">
    <div class="container">
      <header id="dashboard-header">
        <div id="dashboard-logo">
          <div class="cncf-logo" v-on:click="gotoURL()">
            <img src="../assets/images/logo_cncf.png"/>
          </div>
        </div>
        <div id="dashboard-title">
          <span class="title">CI Dashboard:</span>
          <span class="section">Overview</span>
        </div>
      </header>

      <div id="dashboard-updated">
        <span class="icon">
          <i class="fa fa-clock-o"></i>
        </span>
        <span class="updated-label">Last updated</span>
          <span v-if="this.$props.last_updated === ''" class="time-updated">{{ LastUpdatedChecker() }} </span>
          <span v-else class="time-updated">{{ this.$props.last_updated | moment("from", "now") || '12 hours ago' }} </span>
      </div>
  </div>
    <div id="test-environment">
          <span class="test-env-label">Test environment</span>
          <div class="test-env-name">
            <div class="icon">
            <img :src="https://raw.githubusercontent.com/cncf/artwork/1d4e7cf3b60af40e008b2e2413f7a2d1ff784b52/kubernetes/icon/color/kubernetes-icon-noborder-color.png" />
            </div>
            <div>
              Kubernetes &mdash; Stable {{ StableReleaseTag(this.$props.project) }}
            </div>
          </div>
          <div class="test-env-details">
              <div class="stage">Bare Metal (Packet)</div>
              <StatusLabel :url="StableURL(project)" 
              :label="StableStatus(this.$props.project)"
              :branch="'stable'"
             :class="StableStatus(this.$props.project)"/>
          </div>
       </div>
    <div id="test-environment-full">
          <span class="test-env-label">Test environment</span>
          <div class="test-env-name" v-on:click="gotoProjectURL()">
            <div class="icon">
            <img :src="https://raw.githubusercontent.com/cncf/artwork/1d4e7cf3b60af40e008b2e2413f7a2d1ff784b52/kubernetes/icon/color/kubernetes-icon-noborder-color.png" />
            </div>
            <div>
              Kubernetes
            </div>
          </div>
          <div class="environment-divider dash">
          </div>
          <div class="test-env-version">
              Stable {{ StableReleaseTag(this.$props.project) }}
          </div>
          <div class="environment-divider">
              <i class="fa fa-arrow-right"></i>
          </div>

          <div class="stage">Bare Metal (Packet)</div>

          <div class="environment-divider">
              <i class="fa fa-arrow-right"></i>
          </div>
          <StatusLabel :url="StableURL(project)" 
          :label="StableStatus(this.$props.project)"
          :branch="'stable'"
         :class="StableStatus(this.$props.project)"/>
      </div>
  </div>
</template>

<script>
  // import {maps} from 'vuex'
  import StatusBadge from './StatusBadge'
  import StatusLabel from './StatusLabel'

  export default {
    name: 'page-header',
    components: { StatusLabel, StatusBadge },
    props: {
      last_updated: { default: '' },
      all_clouds: { default: [] },
      url: { type: String, default: '' },
      project: { type: Object }
    },
    mounted: function () {
      let v = this

      if (this.$route.path === '/') {
        setInterval(() => {
          console.log('PageHeader mounted: ' + v.$props.last_updated)
          v.$store.dispatch('updateNewTime', v.$props.last_updated)
        }, 1000 * 30
        )
      }
    },
    methods: {
      gotoURL () {
        window.open(this.$props.url, '_blank')
      },
      gotoProjectURL () {
        window.open(this.$props.project.url, '_blank')
      },
      LastUpdatedChecker () {
        if (this.$props.last_updated === '') {
          return this.demoTime(this.$route.path)
        } else {
          return this.$props.last_updated
        }
      },
      demoTime (path) {
        if (path === '/') {
          return this.$props.last_updated
        }
        if (path === '/build' || path === '/build/') {
          return '1 minute ago'
        }
        if (path === '/deploy' || path === '/deploy/') {
          return '1 minute ago'
        }
        if (path === '/success' || path === '/success/') {
          return '5 minutes ago'
        }
        if (path === '/home' || path === '/home/') {
          return '12 hours ago'
        }
        if (path === '/provisioning' || path === '/provisioning/') {
          return '1 minute ago'
        } else {
          return '5 minutes ago'
        }
      },
      ReleaseType: function (type) {
        return type[0].toUpperCase() + type.substring(1)
      },
      StableStatus: function (arg) {
        var status = 'N/A'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'stable') {
            // console.log('Stable pipeline' + pl)
            pl.jobs.forEach(function (j) {
              if (j.order === 1) { status = j.status }
            })
          }
        })

        console.log('stable status:' + status)
        return status
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
      StableReleaseTag: function (arg) {
        let ref = '#'
        arg.pipelines.forEach(function (pl) {
          if (pl.release_type === 'stable') {
            ref = pl.ref
          }
        })

        return ref
      }
    },
    computed: {
      // ...mapGetters({ timer: 'updateTime' })
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

  #dashboard-updated {
    @include mq('md') {
      padding-bottom: 20px;
    }
    .updated-label,
    .time-updated,
    .icon { display: inline-block; }
    .updated-label { font-weight: bold; }
  }

  #test-environment, #test-environment-full {
     align-content: space-around;
     align-items: center;
     background: #F8F8F8;
     border: solid #E5E5E5;
     border-width: 0 1px 1px 1px;
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
      background-color: #E5E5E5;
      content: '';
      width: 30%;
      position: absolute;
      top: -1px;
      height: 1px;
    }
    &::after {
      right: 0;
      @include mq('md') {
       width: calc(100% -  #{rem(25)}  - 140px);
      }
    }
    &::before {
      left: 0;

      @include mq('md') {
        width: calc(#{rem(35)} + #{rem(10)});
      }
    }

    .test-env-label {
         position: absolute;
         top: -8px;
         left: calc(50% - 60px);
         font-weight: 600;
         font-size: rem(14);
         @include mq('md') {
           left: calc(20px);
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
     .test-env-details {
         font-size: rem(14);
         align-items: center;
     }
  }

  #test-environment {
    display: flex;

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
  }

  #test-environment-full {
    margin: auto;
    width: 90%;
    box-sizing: border-box;
    padding: 20px rem(35);
    display: none;
    > div {
      flex: 1;
    }

    .test-env-label {
      //left: 20px;
      left: $paddingLeft;
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
    #dashboard-header,
    #dashboard-updated {
      @include mq('sm') {
        @include fbox(1);
        font-size: rem(14);
      }
    }

    #dashboard-updated {
      @include mq('sm') {
        text-align: right;
        position: relative;
        top: rem(-15);

        .icon { display: none; }
        .updated-label,
        .time-updated {
          display: block;
          text-align: right;
        }
      }
    }
  }

  #page-header {
    @include mq('sm') {
      background: $light;
      margin-bottom: 0;
      padding: 0 rem(10);
      overflow: hidden;
    }
  }

</style>
