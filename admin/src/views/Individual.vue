<template>
  <div class="about">
    <h1>个人信息 </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名字">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="E-mail">
        <el-input v-model="model.email"></el-input>
      </el-form-item>
      <el-form-item label="毕业学校">
        <el-input v-model="model.college"></el-input>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="model.introduction"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button label="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const isEmail = require('isemail')
export default {
  data() {
    return {
      model: {},
      IsEmail: isEmail
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, 'avatar', res.url)
    },
    async save() {
      let res
      if (this.model.hasOwnProperty('_id')) {
        res = await this.$http.put(`rest/individual/${this.model._id}`, this.model)
      } else {
        res = await this.$http.post('rest/individual', this.model)
      }
      this.$router.push('/individual');

      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/individual`)
      this.model = res.data[0]
    }
  },
  computed: {
    isValidate() {
      // return this.IsEmail.validate(this.model.email)
    }
  }
}
</script>

