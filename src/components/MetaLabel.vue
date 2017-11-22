<template>
  <div class="meta-label" :class="this.$props.state">
    <div class="click-zone" v-on:click="gotoURL()"></div>
    <span v-show='this.$props.branch === "head"'><i class="mobile-only fa fa-circle"></i>{{ truncateHeadLabel(this.$props.label) }}</span>
    <span v-if='this.$props.branch === "stable"'><i class="mobile-only fa fa-circle"></i>{{ truncateMobileStableLabel(this.$props.label) }}</span>
    <span v-else-if='this.$props.branch === "N/A"'><i class="mobile-only fa fa-circle"></i>N/A</span>
  </div>
</template>
<script>

export default {
  name: 'meta-label',
  props: {
    label: { type: String, required: true, default: 'N/A' },
    url: { type: String, required: true, default: '#' },
    branch: { type: String, required: true, default: 'N/A' }
  },
  data () {
    return {
      currentState: this.$props.state
    }
  },
  components: { },
  methods: {
    gotoURL () {
      if (this.$props.url === '#') {
        return
      }
      if (!(this.$props.url === '#')) {
        window.open(this.$props.url, '_blank')
      }
    },
    truncateMobileStableLabel (value) {
      return value.substring(0, 10)
    },
    truncateDesktopStableLabel (value) {
      return value.substring(0, 15)
    },
    truncateHeadLabel (value) {
      return value.substring(0, 7)
    }
  },
  computed: {

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

  @include mq('sm') {
    @include fbox;
    @include border-radius;
    text-align: center;
    margin: 0;
    margin-left: rem(5);
    font-size: rem(14);
    color: $black;

    i.fa {
      display: inline-block;
      margin-right: rem(5);
      font-size: rem(15);
      color: $ccc;
    }

    &.success i.fa { color: $green; }
    &.failed i.fa { color: $red; }
    &.running i.fa { color: $blue; }

  }
}
</style>
