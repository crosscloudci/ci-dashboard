<template>
  <div class="meta-label" :class="currentState">
    <div class="click-zone" v-on:click="gotoURL()"></div>
    <span><i class="mobile-only fa fa-circle"></i>{{ this.$props.label }}</span>
  </div>
</template>

<script>
import ToolTip from './ToolTip'

export default {
  name: 'meta-label',
  props: {
    label: { type: String, required: true, default: '...' },
    url: { type: String, required: true, default: '#' }
  },
  data () {
    return {
      currentState: this.$props.state
    }
  },
  components: {ToolTip},
  methods: {
    gotoURL () {
      window.open(this.$props.url, '_blank')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/stylesheets/colors";
@import "../assets/stylesheets/variables";
@import "../assets/stylesheets/mixins";

.meta-label {
  color: $blue;
  cursor: pointer;
  padding: rem(5);
  position: relative;

  &:hover .tool-tip { display: block; }

  &.mobile {
    @include mq('sm') {
      @include fbox;
      @include border-radius;
      text-align: center;
      margin: 0;
      margin-left: rem(5);
      font-size: rem(14);
      color: $black;

      i.fa { display: inline-block; margin-right: rem(5)}

      &.success i.fa { color: $green; }
      &.failed i.fa { color: $red; }
      &.running i.fa { color: $blue; }

    }
  }
}
</style>
