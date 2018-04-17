<template>
  <div id="app" ref="app">
    <PageHeader :last_updated="timer" url="https://cncf.io"/>
		<BetaModal v-if="showModal" @close="showModal = false" />
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
import AppFooter from './components/AppFooter'
import BetaModal from './components/BetaModal'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {PageHeader, AppFooter, BetaModal},
  data: function () {
    return {
      showModal: true,
      windowHeight: 0
    }
  },
  computed: {
    ...mapGetters({ timer: 'updateTime' })
  }
}
</script>

<style lang="scss">
  @import "assets/stylesheets/colors";
  @import "assets/stylesheets/variables";
  @import "assets/stylesheets/mixins";

  @include mq('md') {
    body,html {
      height: 100%;
    }

    #app {
      height: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    #main-table {
      flex: 1;
      height: 100%;
    }
  }

  @include mq('sm') {
    body,html {
      height: auto;
      background: $light;
    }

    #app {
      background: $white;
      height: auto;
      min-height: auto;
      display: flex;
      flex-direction: column;

      #main-table {
        min-height: rem(460);
      }
    }
  }

  @media (max-height: 670px) {
    body,html {
      height: auto;
    }

    #app { display: block; }
  }
</style>
