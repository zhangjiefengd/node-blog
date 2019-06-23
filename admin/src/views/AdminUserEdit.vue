<template>
  <div class="about">
    <el-tabs
      type="border-card"
      v-model="tab"
    >
      <el-tab-pane name="admin_list">
        <span slot="label">
          <i class="el-icon-user"></i> 用户列表
        </span>
        <h1>管理员列表</h1>
        <el-table
          :data="adminUsers"
          border
          style="width: 100%"
        >
          <el-table-column prop="_id" label="ID"></el-table-column>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button 
                type="text"
                size="small"
                @click="editorAdmin(scope.row)">编辑</el-button>
              <el-button type="text" size="small"
                v-show="scope.row.username!=='admin'"
                @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="用户设置" name="new_admin">
        <h1>{{ id ? "编辑" : "新建"}}管理员 </h1>
        <el-form label-width="120px" @submit.native.prevent="save">
          
          <el-form-item label="用户名">
            <el-input v-model="newAdminUser.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input  type="password" v-model="newAdminUser.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button label="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      adminUsers: [],
      newAdminUser: {},
      tab: 'admin_list'
    }
  },
  created() {
    this.fetch()
    if (this.id) {
      this.tab = 'new_admin'
    }
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.newAdminUser)
      } else {
        res = await this.$http.post('rest/admin_users', this.newAdminUser)
      }
      this.tab = 'admin_list'
      this.fetch()
      this.$router.push('/admin_users')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users`)
      this.adminUsers = res.data
      console.log(this.adminUsers)
    },
    async remove(row) {
      this.$confirm(`是否确定要删除 "${row.username} "`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then( async () => {
          const res = await this.$http.delete(`rest/admin_users/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
    },
    async editorAdmin(scope) {
      console.log(scope)
      this.$router.push(`/admin_users/${scope._id}`)
      this.tab = 'new_admin'
      this.newAdminUser = scope
    }
  },
  computed: {
  }
}
</script>