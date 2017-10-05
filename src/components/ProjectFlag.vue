<template>
  <div class="project-flag" v-on:click="gotoURL()">
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

    .wrapper {
      @include flex-container;

      .icon,
      .information { @include fbox; }

      .icon {
        width: rem(40);
        height: rem(40);

        @include mq('lg') {
          width: rem(60);
          height: rem(60);
        }

        @include mq('sm') {
          width: rem(30);
          height: rem(30);
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