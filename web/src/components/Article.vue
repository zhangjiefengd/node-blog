<template>
  <div class="article">
    <h1>{{ model.title }}</h1>
    <p><strong> 摘要：</strong>{{ model.abstruct }}</p>
    <div v-html="model.content"></div>
  </div>
</template>
<script>
export default {
  name: 'page',
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
