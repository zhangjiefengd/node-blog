<template>
  <div>
    <h1>文章列表</h1>
    <el-table
     :data="items"
     border
     :cell-class-name="fun"
    >
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="author[0].username" label="作者"></el-table-column>
      <el-table-column prop="content" label="内容">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
      <template slot-scope="scope">
        <el-button size="small"
          @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
        <el-button size="small"
          type="danger"
          @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<style>
.text_overflow .cell{
  height: 23px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/articles')

      this.items = res.data
    },
    async remove(row) {
      this.$confirm(`是否确定要删除文章 "${row.title} "`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then( async () => {
          const res = await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
    },
    fun() {
      if (arguments[0].hasOwnProperty('columnIndex') && arguments[0].columnIndex === 4) return 
      return 'text_overflow'
    }
  },
}
</script>