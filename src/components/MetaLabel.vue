<template>
  <div class="meta-label" :class="currentState" v-on:click="gotoURL()">
    <span>{{ this.$props.label }}</span>
    <ToolTip content="We should be able to render Markdown or HTML in here."/>
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
  margin-bottom: rem(10);
  position: relative;

  &:hover { text-decoration: underline; }
  &:hover .tool-tip { display: block; }

  &.mobile {
    @include mq('sm') {
      @include fbox;
      @include border-radius;
      text-align: center;
      margin: 0;
      margin-left: rem(5);

      &.success {
        background: $green;
        color: $white;
        padding: rem(5) rem(10);
        font-size: rem(14);
      }
      &.running {
        background: $blue;
        color: $white;
        padding: rem(5) rem(10);
        font-size: rem(14);
      }
      &.failed {
        background: $red;
        color: $white;
        padding: rem(5) rem(10);
        font-size: rem(14);
      }
    }
  }
}
</style>
