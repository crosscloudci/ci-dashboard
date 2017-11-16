<template>
  <div id="top-banner" v-on:click="gotoURL()">
    <span>daddy likes tacos</span>

    <div class="container">
      <div class="linux-foundation-logo">
        <img src="../assets/images/logo_lf_projects_horizontal.png"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-banner',
  props: ['url'],
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
    cursor: pointer;

    @include mq('sm'){ display: none; }

    .linux-foundation-logo {
      width: rem(300);
      img { width: inherit; }
    }
  }
</style>