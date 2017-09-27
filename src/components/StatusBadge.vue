<template>
  <div class="status-badge" :class="currentState" v-on:click="gotoURL()">
    <div class="badge">

      <span class="icon" v-if="currentState === 'success'">
        <i class="fa fa-check-circle"></i>
      </span>
      <span class="icon" v-else-if="currentState === 'running'">
        <i class="fa fa-circle-o-notch fa-spin"></i>
      </span>
      <span class="icon" v-else-if="currentState === 'failed'">
        <i class="fa fa-exclamation-circle"></i>
      </span>
      <span class="icon" v-else>
        <i class="fa fa-check"></i>
      </span>

      <span class="label">{{ currentState }}</span>
    </div>
    <ToolTip content="We should be able to render Markdown or HTML in here."/>
  </div>

</template>

<script>
import ToolTip from './ToolTip'
export default {
  name: 'status-badge',
  props: ['url', 'state'],
  components: {ToolTip},
  data () {
    return {
      currentState: this.$props.state
    }
  },
  methods: {
    gotoURL () {
      window.open(this.$props.url, '_blank')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/stylesheets/variables";
@import "../assets/stylesheets/colors";
@import "../assets/stylesheets/mixins";

.status-badge {
  width: rem(80);
  margin: auto;
  position: relative;

  &.success { @include badge($green, $white); }
  &.running { @include badge($blue, $white); }
  &.failed { @include badge($red, $white); }
  &:hover .tool-tip { display: block; }

  .badge {
    .icon,
    .label {
      display: inline-table;
      transition:all 0.3s;
    }

    .icon {
      display: inline-block;
      position: relative;
      top: 1px;
    }

    .label {
      font-size: rem(12);
      text-transform: uppercase;
      visibility: visible;
    }
  }
}
</style>
