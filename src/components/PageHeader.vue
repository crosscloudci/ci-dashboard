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
        <span class="time-updated">{{ LastUpdatedChecker() }} </span>
       <!-- <span class="time-updated">{{ LastUpdatedChecker(this.$props.last_updated | moment("from", "now") || '12 hours ago' }} </span> --> 
      </div>
    </div>
  </div>
</template>

<script>
  // import {maps} from 'vuex'

  export default {
    name: 'page-header',
    props: {
      last_updated: { default: '' },
      url: { type: String }
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
        if (path === '/deploy' || path === '/deploy/') {
          return '1 minute ago'
        } else {
          return '5 minutes ago'
        }
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
    }
  }

</style>
