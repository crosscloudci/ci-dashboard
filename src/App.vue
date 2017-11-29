<template>
  <div id="app">
    <TopBanner url="https://www.linuxfoundation.org/projects/"/>
    <PageHeader :last_updated="timer" url="https://cncf.io"/>
    <MainTable/>
  </div>
</template>

<script>
import TopBanner from './components/TopBanner'
import PageHeader from './components/PageHeader'
import MainTable from './components/MainTable'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {TopBanner, PageHeader, MainTable},
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

</style>