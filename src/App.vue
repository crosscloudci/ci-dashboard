<template>
  <div id="app">
    <TopBanner/>
    <PageHeader/>
    <!-- <MainTable/> -->
    <div id="dashboard-project-list-container">
      <div class="container">
        <div class="dashboard-list">
          <DashboardListItem v-for="project in projects" :project="project"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TopBanner from './components/TopBanner'
import PageHeader from './components/PageHeader'
import MainTable from './components/MainTable'
import DashboardListItem from './components/DashboardListItem'

export default {
  name: 'app',
  components: {TopBanner, PageHeader, MainTable, DashboardListItem},
  data: function () {
    return {
      projects: [
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Project name', caption: 'caption here', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/stylesheets/colors";
  @import "./assets/stylesheets/variables";
  @import "./assets/stylesheets/mixins";

  .hide-sm {
    @include mq('sm') { display: none; }
  }
  .hide-md {
    @include mq('md') { display: none; }
  }
  .show-lg {
    @include mq('lg') { display: block; }
  }

  #dashboard-project-list-container {
    .dashboard-list {

    }
  }

</style>