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
            <img :src="this.$props.all_projects[0].icon" />
            </div>
            <div>
              Kubernetes &mdash; Stable {{ StableReleaseTag(this.$props.all_projects[0]) }}
            </div>
          </div>
          <div class="test-env-details">
              <div class="stage"> {{ this.$props.all_clouds[0].cloud_name }}</div>
              <StatusLabel :url="this.$props.url" 
              :label="StableStatus(this.$props.all_projects[0])"
              :branch="'stable'"
             :class="StableStatus(this.$props.all_projects[0])"/>
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
      all_projects: { default: [] },
      all_clouds: { default: [] },
      url: { type: String, default: '' }
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
      StableStatus: function (arg) {
        var status = 'N/A'
        console.log('arg', arg)
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

  #dashboard-header {
    @include flex-container;
    padding: rem(40) 0;
    // margin-top: rem(30);

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

    @include mq('sm'){
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
    .updated-label,
    .time-updated,
    .icon { display: inline-block; }
    .updated-label { font-weight: bold; }
  }

  #test-environment {
     align-content: space-around;
     background: #F8F8F8;
     border: solid #E5E5E5;
     border-width: 0 1px 1px 1px;
     display: flex;
     flex-direction: column;
     justify-content: space-around;
     margin: 0 15px 20px 15px;
     position: relative;
     text-align: center;
     padding: 20px;

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
    }
    &::before {
      left: 0;
    }
    .icon {
      width: rem(35);
      height: rem(35);
      position: relative;
     // top: rem(10);
      @include mq('sm') {
        width: rem(25/2);
        height: rem(25/2);

//        top: rem(4);
 //       left: rem(5);
          margin-right: 5px;
      }

      img { width: inherit; }
    }

     .test-env-label {
         position: absolute;
         top: -8px;
         left: calc(50% - 60px);
         font-weight: 600;
         font-size: rem(14);
     }
     .test-env-name, .test-env-details {
         display: flex;
         justify-content: center;
     }
     .test-env-name {
         align-items: baseline;
         padding-bottom: 20px;
         font-weight: 700;
     }
     .test-env-details {
         font-size: rem(14);
     }
  }

  .container {
    @include mq('sm') {
      @include flex-container;
      align-items:baseline;
      align-content:stretch;
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
