<template>
  <div>
    <section-block title="商城轮播">
      <template #action>
        <el-button type="primary" size="mini" @click="addInput.dialogVisible = true">添加轮播</el-button>
      </template>

      <div>
        <el-table v-loading="loading" :data="records" border style="width: 100%;">
          <el-table-column prop="id" label="编号" width="100"></el-table-column>
          <el-table-column prop="type_text" label="图片" width="100" align="center">
            <template slot-scope="scope">
              <el-popover placement="top" trigger="hover">
                <img :src="scope.row.picture" style="width: 375px" alt="">
                <span slot="reference">轮播图</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="type_text" label="类型" width="100"></el-table-column>
          <el-table-column prop="value" label="值"></el-table-column>
          <el-table-column prop="expired_at" label="过期时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group size="mini">
                <el-button size="mini" type="success" @click="refresh(scope.row.id)">刷新</el-button>
                <el-button size="mini" type="warning" @click="cancel(scope.row.id)">取消</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <div class="pt-5">
          <el-pagination
              background
              layout="prev, pager, next"
              :page-size="20"
              :total="dataCount"
              @current-change="load">
          </el-pagination>
        </div>
      </div>
    </section-block>

    <el-dialog title="添加轮播" :visible.sync="addInput.dialogVisible" width="33vw" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-position="right" label-width="100px" :model="form" :rules="createRules" ref="createForm">
        <el-form-item label="轮播类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="goods">商品</el-radio>
            <el-radio label="category">分类</el-radio>
            <el-radio label="link">链接</el-radio>
            <el-radio label="page">页面</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="跳转值" prop="value">
          <el-input v-model.lazy.trim="form.value"></el-input>
        </el-form-item>

        <el-form-item label="轮播图片" prop="picture">
          <p>尺寸建议: 750 x 360</p>
          <el-upload
              class="avatar-uploader"
              name="file"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="form.picture" :src="form.picture" class="avatar" alt="">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="轮播备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item label="过期时间" prop="expired_at">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model.lazy.trim="form.expired_at" type="datetime" placeholder="选择过期时间" style="width: 100%;"></el-date-picker>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addInput.dialogVisible = false">取 消</el-button>
        <el-button :loading="addInput.loading" type="primary" @click="submitForm('createForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Request from "../../utils/request";


  let createRules = {
    type: { required: true, message: '请选择类型', },
    value: { required: true, message: '请填写跳转值', },
    picture: { required: true, message: '请正确上传轮播图片', },
    remark: { required: true, message: '请填写备注', },
    expired_at: { required: true, message: '请选择过期时间', },
  }
  export default {
    name: "carousel",
    data() {
      return {
        createRules: createRules,
        addInput: {
          loading: false,
          dialogVisible: false,
        },
        form: {
          type: null,
          value: null,
          picture: null,
          remark: null,
          expired_at: null,
        },

        loading: false,
        dataCount: 0,
        records: [],
      }
    },

    computed: {
      uploadUrl() {
        return Request.getApiUrl('upload')
      },

      uploadHeaders() {
        return {}
      },
    },

    created() {
      this.load()
    },

    methods: {
      refresh(id) {
        let loading = this.$loading({
          lock: true,
          text: '正在处理中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        Request.put('refresh_carousel', {
          id: id
        }).then(() => {
          this.$message.success('刷新成功!')
          this.load(1)
        }).finally(() => loading.close())
      },

      cancel(id) {
        this.$confirm('确定要删除这个轮播吗?', '需要确认').then(() => {
          let loading = this.$loading({
            lock: true,
            text: '正在处理中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          Request.delete('cancel_mall_carousel', {
            id: id
          }).then(() => {
            this.$message.success('取消成功!')
            this.load(1)
          }).finally(() => loading.close())
        }).catch(() => {
        })
      },

      load(page) {
        this.loading = true
        Request.get('mall_carousel', {
          page: page || 1,
        }).then((res) => {
          this.records = res.data.data
          this.dataCount = res.data.total
        }).finally(() => this.loading = false)
      },

      handleAvatarSuccess(response) {
        this.form.picture = response.data
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 < 500

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 500kb!')
          return false
        }
        return isJPG && isLt2M
      },

      submitForm() {
        this.$refs['createForm'].validate(valid => {
          if (valid) {
            this.addInput.loading = true
            Request.post('add_mall_carousel', this.form)
              .then(res => {
                this.$message.success('新增轮播成功!')
                this.load()
                this.addInput.dialogVisible = false
              }).finally(() => this.addInput.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 375px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }

  .avatar {
    width: 375px;
    height: 180px;
    display: block;
  }
</style>
