<template>
  <div id="app" ref="app">
    <PageHeader :last_updated="timer"
   :all_clouds="clouds" :project="projects[0]"
   url="https://cncf.io"/>
	 <TestEnvironment :all_clouds="clouds" :project="projects[0]" />
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader'
import AppFooter from './components/AppFooter'
import TestEnvironment from './components/TestEnvironment'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {PageHeader, TestEnvironment, AppFooter},
  data: function () {
    return {
      windowHeight: 0
    }
  },
  computed: {
    ...mapGetters({ clouds: 'allClouds', projects: 'allProjects', timer: 'updateTime' })
  }
}
</script>

<style lang="scss">
  @import "assets/stylesheets/colors";
  @import "assets/stylesheets/variables";
  @import "assets/stylesheets/mixins";
  

  html {
      box-sizing: content-box !important;
  }

  @include mq('md') {
    body,html {
      height: 100%;
    }

    #app {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    #projects-listing {
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
    }
  }

  @media (max-height: 750px) {
    body,html {
      height: auto;
    }

    #app { display: block; }
  }
</style>
