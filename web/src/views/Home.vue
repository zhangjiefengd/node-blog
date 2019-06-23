<template>
  <div id="Home">
    <home-nav></home-nav>
    <articles></articles>
  </div>
</template>

<script>
import Articles from '../components/Articles'
import HomeNav from '../components/HomeNav'
export default {
  name: 'Home',
  components: {
    Articles,
    HomeNav
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
