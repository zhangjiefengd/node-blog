<template>
  <div id="articles">
    <div
      class="article-box"
      @click="$router.push(`/article/${article._id}`)"
      v-for="(article) in articles"
      :key="article._id">
      <h3>{{article.title}}</h3>
      <div class="article-label">
        <span>标签：{{ article.categories[0].name }}</span>
        <span>, 游览次数：{{ article.visitorNum || 0 }}</span>
      </div>
      <div v-html="article.abstruct"
        class="abstruct"></div>
      <div
        class="article-info">
        <span>更新时间：{{ article.updateTime.split('T')[0] }}</span>
        <span>作者：{{ article.author[0].username }}</span>
      </div>
    </div>
    <el-row 
      type="flex"
      justify="center"
      class="article-page">
      <el-pagination
        @current-change="currentChange"
        :current-page.sync="page.number"
        layout="prev, pager, next, jumper"
        :page-size.sync="page.pageSize"
        hide-on-single-page
        :current-change="currentChange"
        :total="page.total">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'articles',
  data() {
    return {
      individual: {},
      articles: [],
      page: {
        number: 1,
        pageSize: 1,
        total: 1
      }
    }
  },
  created() {
    this.fetch(this.page.number)
  },
  methods: {
    async fetch(number) {
      const res = await this.$http.get(`articles?number=${number}`)
      this.articles = res.data.articles
      this.page = res.data.page
    },
    currentChange(val) {
      this.fetch(val)
    }
  },
}
</script>
<style>
#articles {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.article-box {
  /* width: clac(100% - 2px); */
  width: 50rem;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #fff;
  transition: all .5s;
}
.article-box:hover {
  border: 1px solid #d1d1d1;
  transform: scale(1.1);
}
.article-box h3 {
  margin: .5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.article-box .article-label {
  text-align: center;
  font-size: 12px;
}
.article-box div.abstruct {
  display: -moz-box;
  display: -webkit-box;
  display: box; 
  -moz-box-orient: vertical;
  -webkit-box-orient: vertical;
  box-orient: vertical; 
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-indent: 2em;
  font-size: 16px;
  line-height: 25px;
}
.article-box .article-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  margin: 5px 0;
}
.article-page {
  width: 100%;
  margin: 50px 0;
}
</style>
