<template>
  <div id="Home">
    <all-nav></all-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AllNav from '../components/Nav'
export default {
  name: 'Home',
  components: {
    AllNav
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },

}
</script>
