<template>
  <div id="app">
    <TopBanner url="https://www.linuxfoundation.org/projects/"/>
    <PageHeader :last_updated="timer" url="https://cncf.io"/>
    <MainTable/>
    <AppFooter/>
  </div>
</template>

<script>
import TopBanner from './components/TopBanner'
import PageHeader from './components/PageHeader'
import MainTable from './components/MainTable'
import AppFooter from './components/AppFooter'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {TopBanner, PageHeader, MainTable, AppFooter},
  data: function () {
    return {
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
</style>