<template>
  <div class="meta-label" :class="this.$props.state">
    <div class="click-zone" v-on:click="gotoURL()"></div>
    <span><i class="mobile-only fa fa-circle"></i>{{ truncateLabel(this.$props.label) }}</span>
  </div>
</template>

<script>

export default {
  name: 'meta-label',
  props: {
    label: { type: String, required: true, default: 'N/A' },
    url: { type: String, required: true, default: '#' }
  },
  data () {
    return {
      currentState: this.$props.state
    }
  },
  components: { },
  methods: {
    gotoURL () {
      window.open(this.$props.url, '_blank')
    },
    truncateLabel (value) {
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
