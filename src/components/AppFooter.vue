<template>
  <div id="app-footer">
    <div class="container footer-container">
      <div class="footer-content">
        <div class="built-by">
          <span>Created for</span>
          <a href="http://cncf.io" target="_blank">CNCF</a>
        </div>

        <div class="social-links">
          <a class="social" href="https://github.com/crosscloudci/ci-dashboard" target="_blank"><i class="fa fa-github"></i></a>
          <a class="social" href="https://twitter.com/cncfci" target="_blank"><i class="fa fa-twitter"></i></a>
          <a class="social" href="mailto:cncfci@vulk.coop"><i class="fa fa-envelope"></i></a>
        </div>

        <div class="report-bug">
          <a class="report-bug-link" href="http://github.com/crosscloudci/ci-dashboard/issues" target="_blank"><i class="fa fa-bug"></i> Report bug</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-footer',
    props: [],
    components: { },
    data () {
      return {}
    },
    created: function () {

    },
    mounted: function () {

    },
    updated: function () {},
    destroyed: function () {}

  }
</script>

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/variables";
  @import "../assets/stylesheets/mixins";

  #app-footer {
    background: $light;
    border-top: 1px solid $ccc;
    padding: rem(10);
    margin-top: 32px;
    @include mq('sm') {
      margin-top: 44px;
    }
  }

  #app-footer a {
    text-decoration: none; }


  .footer-container {
    padding: 0;
  }

  .footer-content {
    @include flex-container;

    .built-by {
      @include fbox(1);
      a { color: $blue; }
    }

    .social-links {
      a {
        padding: 0 rem(10);
        text-align: center;
        border-left: 1px solid $ccc;
        color: $blue;
      }
    }

    .report-bug {
      padding-left: rem(10);
      border-left: 1px solid $ccc;

      a { color: $blue; }
    }

    @include mq('sm') {
      flex-direction: column;
      width: 100%;

      .social-links { order: 1; }
      .report-bug { order: 2; }
      .built-by { order: 3; }

      .social-links {
        @include flex-container;
        height: rem(30);
        width: 100%;
        text-align: center;
        margin-bottom: 1rem;

        a {
          @include fbox;
          width: 33%;
          font-size: rem(24);

          &:first-child { border: none; }
        }
      }

      .report-bug {
        text-align: center;
        border: none;
        margin: auto;
        margin-bottom: rem(20);

        .report-bug-link {
          background: $blue;
          padding: 5px rem(24);
          @include border-radius($round);
          color: $white;
          margin: auto;
          text-transform: uppercase;
        }
      }

      .built-by {
        width: 100%;
        text-align: center;

        a { color: $blue; }
      }
    }
  }
</style>
