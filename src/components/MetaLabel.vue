<template>
  <div class="meta-label" v-on:click="gotoURL()">
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
}
</style>
