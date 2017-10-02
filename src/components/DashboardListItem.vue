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
        <MetaLabel label="v1.87" url="http://google.com"/>
        <MetaLabel label="72jsbg" url="http://google.com"/>
      </div>
    </div>

    <div class="deployment-blocks">
      <div class="item-block ${`deployment`}" v-for="deployment in project.deployments">
        <StatusBadge :state="demoState3" url="http://google.com" :title="deployment"/>
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
      demoStateTypes: ['success', 'running', 'failed']
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
    }
  },
  created: function () {},
  mounted: function () {},
  updated: function () {},
  destroyed: function () {}

}
</script>

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/variables";
  @import "../assets/stylesheets/mixins";

  .dashboard-list-item {
    @include flex-container;
    border-bottom: 1px solid $ccc;
    align-content:stretch;
    padding-top: rem(20);

    @include mq('sm') { flex-wrap:wrap; }

    .deployment-blocks,
    .status-blocks {
      @include flex-container;
      @include fbox(1);

      .item-block {
        @include fbox(1);
        margin-right: rem(5);
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
        .item-block.status {
          display: none;
        }

        .item-block.stable {
          @include flex-container;
          justify-content:flex-end;
          .meta-label {
            @include fbox;
            @include badge($red, $white);
            text-align: center;
          }
        }
      }
    }
  }
</style>
