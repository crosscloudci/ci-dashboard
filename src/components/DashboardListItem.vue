<template>
  <div :class="['tr', isOpen? 'open' : '' ]">
    <div class="td projects">
      <ProjectFlag
        url="http://google.com"
        title="Project name"
        caption="Caption here"/>
    </div>

    <div class="td build">
      <StatusBadge :state="demoState1" url="https://gitlab.cncf.ci/kubernetes/kubernetes/-/jobs/25754"/>
      <StatusBadge :state="demoState2" url="http://github.com/cncf/cross-cloud"/>
    </div>

    <div class="td release">
      <MetaLabel label="v1.8.2" url="https://github.com/kubernetes/kubernetes/commit/bdaeafa71f6c7c04636251031f93464384d54963" :class="[demoState1, respondToBrowser]"/>
      <MetaLabel label="1f53329" url="https://github.com/kubernetes/kubernetes/commit/1f53329c674e427264546247da1ae35c0826cbfd" :class="[demoState3, respondToBrowser]"/>
    </div>

    <div class="td deployments">
      <div class="item-block" v-for="deployment in project.deployments">
        <StatusBadge :state="demoState3" url="http://google.com"/>
        <StatusBadge :state="demoState1" url="http://google.com"/>
      </div>
    </div>
  </div>
</template>

<script>
import array from '../lib/Array'
import ProjectFlag from './ProjectFlag'
import MetaLabel from './MetaLabel'
import StatusBadge from './StatusBadge'

export default {
  name: 'dashboard-list-item',
  props: ['project'],
  components: {ProjectFlag, StatusBadge, MetaLabel},
  data () {
    return {
      demoStateTypes: ['success', 'running', 'failed'],
      windowWidth: 0,
      isOpen: false
    }
  },
  computed: {
    // For Demo
    demoState1: function () {
      return array.random(this.demoStateTypes)
    },
    demoState2: function () {
      return array.random(this.demoStateTypes)
    },
    demoState3: function () {
      return array.random(this.demoStateTypes)
    },
    respondToBrowser: function () {
      if (this.windowWidth <= '639') {
        return 'mobile'
      } else {
        return ''
      }
    }
  },
  created: function () {},
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
      this.getWindowWidth()
    })
  },
  methods: {
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
    },
    toggleDeploymentPane (event) {
      this.isOpen = !this.isOpen
    }
  },
  updated: function () {},
  beforeDestroy: function () {
    window.removeEventListener('resize', this.getWindowWidth)
  }

}
</script>

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/variables";
  @import "../assets/stylesheets/mixins";

  .dashboard-list-item {
    @include flex-container;
    align-content:stretch;
    padding-top: rem(20);
    border-bottom: 1px solid $ccc;

    @include mq('sm') {
      flex-wrap:wrap;
      padding: 0;
    }

    .expander {
      padding: rem(5);
      text-align: center;
      background: $light;
      border-top: 1px solid $ccc;
      width: 100%;
      display: none;
    }

    .deployment-blocks,
    .status-blocks {
      @include flex-container;
      @include fbox(1);

      .item-block {
        @include fbox(1);
        margin-right: rem(5);

        .status-badge {
          margin-bottom: rem(10);
        }
      }
    }

    @include mq('sm') {
      .deployment-blocks {
        overflow: hidden;
        height: 0;
        transition:all 0.5s;

        flex-wrap:wrap;
        .item-block {
          @include fbox(1);
          width: 100%;
        }
      }

      .expander { display: block; }

      .status-blocks {
        border-bottom: 1px solid $ccc;
        padding: rem(10);

        .item-block.status {
          display: none;
        }

        .item-block.stable {
          @include flex-container;
          justify-content:flex-end;
        }
      }
    }
  }

  .dashboard-list-item.open {
    .deployment-blocks { height: auto; }
  }
</style>
