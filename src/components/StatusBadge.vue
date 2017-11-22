<template>
  <div class="status-badge" :class="this.$props.state" v-on:click="gotoURL()">
    <div class="badge">

      <span class="icon" v-if="this.$props.state === 'success'">
        <i class="fa fa-check-circle"></i>
      </span>
      <span class="icon" v-else-if="this.$props.state === 'running'">
        <i class="fa fa-circle-o-notch fa-spin"></i>
      </span>
      <span class="icon" v-else-if="this.$props.state === 'failed'">
        <i class="fa fa-exclamation-circle"></i>
      </span>
      <span class="icon" v-else-if="this.$props.state === 'N/A'">
        <i class="fa fa-ellipsis-h"></i>
      </span>
      <span class="icon" v-else>
        <i class="fa fa-ellipsis-h"> N/A</i>
      </span>

      <span class="label">{{ this.$props.state }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'status-badge',
  props: {
    state: { type: String, required: true, default: '...' },
    url: { type: String, required: true, default: '#' }
  },
  components: {},
  data () {
    return {
      currentState: this.$props.state
    }
  },
  methods: {
    gotoURL () {
      if (this.$props.url === '#') {
        return
      }
      if (!(this.$props.url === '#')) {
        window.open(this.$props.url, '_blank')
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/stylesheets/variables";
@import "../assets/stylesheets/colors";
@import "../assets/stylesheets/mixins";

.status-badge {
  position: relative;
  padding: rem(2) rem(4);
  width: rem(70);
  @include badge($ccc, $dark);
  &:hover { background: $ccc; color: $dark; cursor: not-allowed; }

  &.success { @include badge($green, $white); }
  &.running { @include badge($blue, $white); }
  &.failed { @include badge($red, $white); }
  // &:hover .tool-tip { display: block; }

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
      text-transform: uppercase;
      visibility: visible;
    }
  }
}
</style>
