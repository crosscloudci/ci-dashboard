<template>
  <div id="page-header">
    <div class="container">
      <header id="dashboard-header">
        <div id="dashboard-logo">
          <div class="cncf-logo" v-on:click="gotoURL()">
            <img src="https://raw.githubusercontent.com/cncf/artwork/master/cncf/horizontal/color/cncf-color.svg?sanitize=true"/>
          </div>
        </div>
        <div id="dashboard-title">
          <span class="title">CI Dashboard:</span>
          <span class="section">Overview</span>
        </div>
      </header>

      <div id="dashboard-updated">
        <div id="dashboard-updated-content">
            <span class="icon">
              <i class="fa fa-clock-o"></i>
            </span>
            <span class="updated-label">Last updated:</span>
              <span v-if="this.$props.last_updated === ''" class="time-updated">{{ LastUpdatedChecker() }} </span>
              <span v-else class="time-updated">{{ this.$props.last_updated | moment("from", "now") || '12 hours ago' }} </span>
              </div>
      </div>
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
      display: flex;
      justify-content: flex-end;
    }
    #dashboard-updated-content {
        .updated-label,
        .time-updated,
        .icon { display: inline-block; }

        .updated-label { font-weight: bold; }
        @include mq('sm') {
          .time-updated {
            display: block;
            font-size: 12px;
          }
        }
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
        font-size: rem(14);
      }
    }

    #dashboard-updated {
      @include mq('sm') {
        text-align: right;
        position: relative;
        top: rem(-15);

        #dashboard-updated-content {
            .icon { 
              margin-right: -1px;
              font-size: rem(15); 
            }
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
      > .container {
        justify-content: space-around;
     }
    }
  }

</style>
