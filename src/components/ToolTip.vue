<template>
  <div class="tool-tip">
    <div class="content">
      {{ tipContent }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'tool-tip',
  props: {
    content: { type: String }
  },
  components: { },
  data () {
    return {
      tipContent: this.$props.content
    }
  },
  created: function () {},
  mounted: function () {},
  updated: function () {},
  destroyed: function () {}
}
</script>

<style lang="scss">
@import "../assets/stylesheets/variables";
@import "../assets/stylesheets/colors";
@import "../assets/stylesheets/mixins";
.tool-tip {
  @include shadow;
  background: $white;
  padding: rem(20);
  position: absolute;
  z-index: 1000;
  display: none;
  width: rem(300);

  .content {
    color:$dark;
    font-size: rem(14);
    line-height: rem(20);
    font-weight: normal;
  }
}
</style>
