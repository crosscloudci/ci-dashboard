<template>
  <div id="app">
    <TopBanner/>
    <PageHeader/>
    <MainTable :projects="projects"/>
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
      projects: [
      { title: 'Kubernetes', caption: 'Orchestration', url: 'http://kubernetes.io/', icon: 'https://www.cncf.io/wp-content/uploads/2016/09/ico_kubernetes-100x100.png', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Prometheus', caption: 'Monitoring', url: 'http://prometheus.io/', icon: 'https://www.cncf.io/wp-content/uploads/2016/09/ico_prometheus-100x100.png', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'OpenTracing', caption: 'Distributed Tracing API', url: 'http://opentracing.io/', icon: 'https://www.cncf.io/wp-content/uploads/2016/09/logo_opentracing.png', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'Fluentd', caption: 'Logging', url: 'http://fluentd.org/', icon: 'https://www.cncf.io/wp-content/uploads/2016/09/logo_fluentd.png', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'linkerd', caption: 'Service Mesh', url: 'https://www.linkerd.io/', icon: 'https://www.cncf.io/wp-content/uploads/2016/09/ico_linkerd5-e1485379975148.png', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] },
      { title: 'gRPC', caption: 'Remote Procedure Call', url: 'http://www.grpc.io/', icon: 'https://www.cncf.io/wp-content/uploads/2016/09/logo_grpc-1-e1488466098164.png', deployments: ['AWS', 'Azure', 'Bluemix', 'GCE', 'GKE', 'Packet'] }

      ]
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/stylesheets/colors";
  @import "./assets/stylesheets/variables";
  @import "./assets/stylesheets/mixins";

</style>