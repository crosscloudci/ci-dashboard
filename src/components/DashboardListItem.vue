<template>
  <div class="dashboard-list-item">
    <div class="status-blocks">
      <div class="item-block project">
        <ProjectFlag
          url="http://google.com"
          title="Project name"
          caption="Caption here"/>
      </div>
      <div class="item-block status">
        <StatusBadge :state="demoState1" url="http://google.com"/>
        <StatusBadge :state="demoState2" url="http://google.com"/>
      </div>
      <div class="item-block stable">
        <!-- if isMobile? '' : '' -->
        <MetaLabel label="v1.87" url="http://google.com" :class="[demoState1, respondToBrowser]"/>
        <MetaLabel label="72jsbg" url="http://google.com" :class="[demoState3, respondToBrowser]"/>
      </div>
    </div>

    <div class="deployment-blocks">
      <div class="item-block ${`deployment`}" v-for="deployment in project.deployments">
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
      windowHeight: 0,
      currentState: this.$props.state
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
      if (this.windowWidth <= '480') {
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
      window.addEventListener('resize', this.getWindowHeight)

      this.getWindowWidth()
      this.getWindowHeight()
    })
  },
  methods: {
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
    },
    getWindowHeight (event) {
      this.windowHeight = document.documentElement.clientHeight
    }
  },
  updated: function () {},
  beforeDestroy: function () {
    window.removeEventListener('resize', this.getWindowWidth)
    window.removeEventListener('resize', this.getWindowHeight)
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

    @include mq('sm') {
      flex-wrap:wrap;
      padding: 0;
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
        flex-wrap:wrap;
        .item-block {
          @include fbox(1);
          width: 100%;
        }
      }

      .status-blocks {
        @include shadow;
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
</style>
