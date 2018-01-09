<template>
  <div id="top-banner">
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
      windowWidth: 0
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
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/mixins";

  #top-banner {
    background: $light;
    padding: rem(10) 0 rem(5) 0;
    border-bottom: 1px solid $ccc;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    @include mq('sm'){ display: none; }

    .linux-foundation-logo {
      width: rem(300);
      img { width: inherit; cursor: pointer; }
    }
  }
</style>
