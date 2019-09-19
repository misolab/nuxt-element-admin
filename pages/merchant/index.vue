<template>
  <div>
    <section-block title="商户列表">
      <template #action>
        <el-button type="primary" size="mini" @click="addInput.dialogVisible = true">添加商户</el-button>
      </template>
      <div>
        <el-table v-loading="loading" :data="merchants" border style="width: 100%;">
          <el-table-column prop="id" label="编号" width="100"></el-table-column>
          <el-table-column prop="name" label="名称">
            <template slot-scope="scope">
              <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover">
                <div>
                  <el-image :src="scope.row.logo"></el-image>
                </div>
                <el-tag slot="reference">{{ scope.row.name }}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="store" label="门店">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="$router.push({name: 'merchant-store', query: {id: scope.row.id}})">查看</el-button>
              <el-button type="success" size="mini" @click="$router.push({name: 'merchant-store', query: {add: true, id: scope.row.id, name: scope.row.name}})">增加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="principal" label="负责人"></el-table-column>
          <el-table-column prop="principal_phone" label="手机号"></el-table-column>
          <el-table-column prop="created_at" label="添加时间"></el-table-column>
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

    <el-dialog title="添加商户" :visible.sync="addInput.dialogVisible" width="33vw" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-position="right" label-width="100px" :model="form" :rules="createRules" ref="createForm">
        <el-form-item label="商户名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="商户介绍" prop="desc">
          <el-input v-model="form.desc" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="负责人" prop="principal">
          <el-input v-model="form.principal"></el-input>
        </el-form-item>

        <el-form-item label="负责人电话" prop="principal_phone">
          <el-input v-model="form.principal_phone" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item label="品牌 LOGO" prop="logo">
          <el-input v-model="form.logo" type="hidden" style="display: none"></el-input>
          <el-upload
              class="avatar-uploader"
              name="file"
              :headers="uploadHeaders"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="form.logo" :src="form.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  import Request from '@/utils/request'

  let createRules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],

    desc: [
      { required: true, message: '请输入描述', trigger: 'blur' },
      { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
    ],

    principal: [
      { required: true, message: '请输入负责人', trigger: 'blur' },
      { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
    ],

    principal_phone: [
      { required: true, message: '请输入负责人手机号', trigger: 'blur' },
      { len: 11, message: '请正确输入负责人手机号', trigger: 'blur' }
    ],

    logo: [
      { required: true, message: '请上传商家 logo', trigger: 'blur' },
      { type: 'url', message: '请正确上传商家 logo', trigger: 'blur' }
    ],
  }

  export default {
    name: "index",
    data() {
      return {
        createRules: createRules,
        addInput: {
          loading: false,
          dialogVisible: false,
        },
        form: {
          name: '',
          desc: '',
          principal: '',
          principal_phone: '',
          logo: '',
        },

        merchants: [],
        dataCount: 0,
        loading: false,
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
      load(page) {
        this.loading = true

        Request.get('merchant_list', {
          page: page || 1
        }).then(response => {
          this.merchants = response.data.data
          this.dataCount = response.data.total
        }).finally(() => {
          this.loading = false
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addInput.loading = true
            Request.post('create_merchant', this.form).then(data => {
              this.addInput.dialogVisible = false
              this.form = {
                name: '',
                desc: '',
                principal: '',
                principal_phone: '',
                logo: '',
              }
              this.load(1)
            }).finally(() => {
              this.addInput.loading = false
            })
          } else {
            this.$message.error('请正确填写内容')
            return false;
          }
        });
      },

      handleAvatarSuccess(file) {
        this.form.logo = file.data
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 < 200;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 200kb!');
        }
        return isJPG && isLt2M;
      }

    }
  }
</script>

<style scoped>
  .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }

  .avatar {
    width: 140px;
    height: 140px;
    display: block;
  }
</style>
