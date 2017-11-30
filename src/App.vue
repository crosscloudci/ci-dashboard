<template>
  <div id="app">
    <TopBanner url="https://www.linuxfoundation.org/projects/"/>
    <PageHeader :last_updated="timer" url="https://cncf.io"/>
    <MainTable/>
  </div>
</template>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-110471743-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-110471743-1');
</script>

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
  #app { overflow-x: hidden; }
</style>
