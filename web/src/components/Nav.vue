<template>
    <el-row type="flex" justify="center" class="home-nav">
      <el-menu
        class="el-menu-nav"
        :default-active="$route.path"
        router
        mode="horizontal">
          <el-menu-item index="/home">首頁</el-menu-item>
          <el-menu-item index="/article_list">文章列表</el-menu-item>
          <el-menu-item index="/individual">個人中心</el-menu-item>
      </el-menu>
    </el-row>
</template>
<script>
export default {
  name: 'homeNav',
  data() {
    return {
      nav: '/',
    }
  },
  created() {
    console.log(this.$route)
  },
}
</script>
<style>
.home-nav {
  width: 100%;
  height: 80px;
  padding: 10px 0;
  margin-bottom: 3rem;
}
</style>
