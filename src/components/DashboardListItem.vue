<template>
  <div :class="['tr', isOpen? 'open' : '' ]">
    xxx
  </div>
</template>

<script>
import array from '../lib/Array'
import ProjectFlag from './ProjectFlag'
import MetaLabel from './MetaLabel'
import StatusBadge from './StatusBadge'

export default {
  name: 'dashboard-list-item',
  props: ['project'],
  components: {ProjectFlag, StatusBadge, MetaLabel},
  data () {
    return {
      demoStateTypes: ['success', 'running', 'failed'],
      windowWidth: 0,
      isOpen: false
    }
  },
  computed: {

  },
  created: function () {},
  mounted: function () {

  },
  methods: {

  },
  updated: function () {},
  beforeDestroy: function () {}

}
</script>

<style lang="scss">
  @import "../assets/stylesheets/colors";
  @import "../assets/stylesheets/variables";
  @import "../assets/stylesheets/mixins";


</style>
