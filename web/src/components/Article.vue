<template>
  <div class="article">
    <all-nav></all-nav>
    <h1>{{ model.title }}</h1>
    <p><strong> 摘要：</strong>{{ model.abstruct }}</p>
    <div v-html="model.content"></div>
  </div>
</template>
<script>
import AllNav from './Nav'
export default {
  name: 'page',
  components: {
    AllNav
  },
  props: {
    id: ''
  },
  data() {
    return {
      model: {}
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const article = await this.$http.get(`/article/${this.id}`)
     this.model = article.data
    }
  }
}
</script>
