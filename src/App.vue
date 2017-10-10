<template>
  <div id="app">
    <TopBanner/>
    <PageHeader/>
    <MainTable/> 

  </div>
</template>

<script>
import TopBanner from './components/TopBanner'
import PageHeader from './components/PageHeader'
import MainTable from './components/MainTable'

export default {
  name: 'app',
  components: {TopBanner, PageHeader, MainTable}
}
</script>
