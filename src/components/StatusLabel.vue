<template>
  <div class="status-label">
    <div class="click-zone" v-on:click="gotoURL()"></div>
    <span v-show='this.$props.branch === "head"'><i class="mobile-only fa circle-indicator"></i>{{ truncateHeadLabel(this.$props.label) }}</span>
    <span v-if='this.$props.branch === "stable"'><i class="mobile-only fa circle-indicator"></i>{{ truncateMobileStableLabel(this.$props.label) }}</span>
    <span v-else-if='this.$props.branch === "N/A"'><i class="mobile-only fa circle-indicator"></i>N/A</span>
  </div>
</template>
<script>

export default {
  name: 'status-label',
  props: {
    label: { type: String, required: true },
    url: { type: String, required: true, default: '#' },
    branch: { type: String, required: false, default: 'N/A' }
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

.status-label {
  color: $blue;
  cursor: pointer;
  position: relative;
  font-weight: 700;
  font-size: 16px;

  &:hover .tool-tip { display: block; }

  @include fbox;
  @include border-radius;
  text-align: center;
  margin: 0;
  // font-size: rem(14);
  font-size: 14px;
  color: $black;
  text-transform: uppercase;

  i.fa {
    display: inline-block;
    margin-right: rem(5);
    //font-size: rem(13);
    font-size: 1rem;
    color: #333;
    &.circle-indicator {
      &::before {
        content: '\f111';
        @include mq('md') {
          content: "\f05e";
        }
      }
    }
  }

  &.success {
    color: $green;
    i.fa.circle-indicator { 
      color: $green; 
       &::before {
        @include mq('md') {
          content: '\f058'; 
        }
      }
    }
  }

  &.failed {
    color: $red; 
    font-weight: 700;
    i.fa {
      color: $red;
      &.circle-indicator::before { 
        @include mq('md') {
          color: $red;
          content: '\f06a';
        }
      }
    }
    &.running i.fa { color: $blue; }
  }
}
</style>
