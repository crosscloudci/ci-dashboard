<template>
  <div class="project-flag">
    <div class="click-zone" v-on:click="gotoURL()"></div>
    <div class="wrapper">
      <div class="icon">
        <img :src="this.$props.icon"/>
      </div>
      <div class="information">
        <span class="title">{{ this.$props.title }}</span>
        <span class="caption">{{ this.$props.caption }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import noImage from '../assets/images/no-image.png'

export default {
  name: 'project-flag',
  props: {
    icon: { type: String, default: noImage },
    url: { type: String, required: true },
    title: { type: String, required: true, default: 'Project name' },
    caption: { type: String, required: true, default: 'Caption here' }
  },
  data: function () {
    return {

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

  .project-flag {
    cursor: pointer;
    @include mq('md') { min-width: rem(240) }
    position: relative;

    .wrapper {
      @include flex-container;

      .icon,
      .information { @include fbox; }

      .icon {
        width: rem(35);
        height: rem(35);

        @include mq('lg') {
          width: rem(50);
          height: rem(50);
        }

        @include mq('sm') {
          width: rem(25);
          height: rem(25);
          position: relative;
          top: rem(8);
          left: rem(10);
          margin-right: rem(10);
        }

        img { width: inherit; }
      }

      .information {
        padding: rem(10);

        .title,
        .caption { display: block; }

        .title {
          font-size: rem(18);
          font-weight: bold;
        }

        .caption {
          font-size: rem(14);
          color: $dark;

          @include mq('sm') { display: none; }
        }
      }
    }
  }
</style>