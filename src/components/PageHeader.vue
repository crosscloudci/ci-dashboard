<template>
  <div id="page-header">
    <div class="container">
      <header id="dashboard-header">
        <div id="dashboard-logo">
          <div class="cncf-logo">
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
        <span class="time-updated">{{this.$props.last_updated}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-header',
  props: {
    last_updated: { type: String, default: '1 min ago' }
  }
}
</script>

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/mixins";

  #dashboard-header {
    @include flex-container;
    padding: rem(40) 0;

    #dashboard-logo,
    #dashboard-title { @include fbox(1); }

    #dashboard-logo {
      .cncf-logo {
        width: rem(260);

        img { width: inherit; }
      }

      @include mq('sm'){
        .cncf-logo { width: rem(230) }
      }
    }

    #dashboard-title {
      text-align: right;
      font-size: rem(24);

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

</style>