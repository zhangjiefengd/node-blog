<template>
  <div class="about">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-document-add"></i> 新建文章
        </span>
        <h1>{{ id ? "编辑" : "新建"}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="saveArticle">
          <el-form-item label="所属分类">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input 
            v-model="model.title"
            placeholder="文章标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input
              v-model="model.abstruct"
              placeholder="提取摘要为了方便在文章列表显示"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <vue-editor v-model="model.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
          </el-form-item>
          <el-form-item>
            <el-button label="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-setting"></i> 分类管理
        </span>
        <h1>新增分类</h1>
        <el-row type="flex">
          <el-input
            v-model="newCategory.name"
            placeholder="请输入类型"
            style="width: 10rem"
            @keyup.enter.native="saveCategory"
          ></el-input>
          <el-button type style="margin: 0 1rem;" @click="saveCategory">添加</el-button>
        </el-row>
        <h1>分类列表</h1>
        <el-table :data="categories" style="width: 100%">
          <el-table-column prop="_id" label="ID"></el-table-column>
          <el-table-column prop="name" label="分类名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="newCategory = scope.row">编辑</el-button>
              <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: [],
      newCategory: {}
    };
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async saveArticle() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }

      this.$router.push("/articles/list");

      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async saveCategory() {
      let res;
      if (this.newCategory._id) {
        res = await this.$http.put(
          `rest/categories/${this.newCategory._id}`,
          this.newCategory
        );
      } else {
        res = await this.$http.post("rest/categories", this.newCategory);
      }

      this.newCategory = {};
      this.fetchCategories();
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name} "`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/categories/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetchCategories();
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    }
  }
};
</script>