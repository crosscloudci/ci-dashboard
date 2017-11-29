<template>
  <div id="top-banner" :style="{width: width+'px'}">
    <div class="container">
      <div class="linux-foundation-logo">
        <img v-on:click="gotoURL()" src="../assets/images/logo_lf_projects_horizontal.png"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-banner',
  props: ['url'],
  data: function () {
    return {
      width: document.documentElement.clientWidth
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth())
    })
  },
  methods: {
    gotoURL () {
      window.open(this.$props.url, '_blank')
    },
    getWindowWidth (event) {
      return document.documentElement.clientWidth
    }
  }
}
</script>

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/mixins";

  #top-banner {
    background: $light;
    padding: rem(10) 0 rem(5) 0;
    border-bottom: 1px solid $ccc;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    @include mq('sm'){ display: none; }

    .linux-foundation-logo {
      width: rem(300);
      img { width: inherit; }
    }
  }
</style>