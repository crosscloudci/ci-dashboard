<template>
  <div id="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="built-by">
          <span>Created for</span>
          <a href="http://cncf.io" target="_blank">CNCF</a>
          <span>by</span>
          <a href="http://crosscloud.ci" target="_blank">Cross-Cloud CI</a>
        </div>

        <div class="social-links">
          <a class="social" href="http://github.com/crosscloudci" target="_blank"><i class="fa fa-github"></i></a>
          <a class="social" href="http://twitter.com/crosscloudci" target="_blank"><i class="fa fa-twitter"></i></a>
          <a class="social" href="mailto:crosscloudci@vulk.coop"><i class="fa fa-envelope"></i></a>
        </div>

        <div class="report-bug">
          <a class="report-bug-link" href="http://github.com/crosscloudci/crosscloudci/issues" target="_blank"><i class="fa fa-bug"></i> Report bug</a>
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
    mounted: function () {},
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
    padding: rem(10);
  }

  #app-footer a {
    text-decoration: none; }

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
        margin-bottom: rem(20);

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
          padding: rem(5) rem(24);
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
