<template>
  <div id="app">
    <TopBanner url="https://www.linuxfoundation.org/projects/"/>
    <PageHeader url="https://cncf.io"/>
    <MainTable/>
  </div>
</template>

<script>
import TopBanner from './components/TopBanner'
import PageHeader from './components/PageHeader'
import MainTable from './components/MainTable'

export default {
  name: 'app',
  components: {TopBanner, PageHeader, MainTable},
  data: function () {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
