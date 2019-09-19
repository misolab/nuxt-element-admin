<template>
  <div>
    <section-block title="商品分类">
      <template #action>
        <el-button type="primary" size="mini" @click="addInput.dialogVisible = true">添加分类</el-button>
      </template>
      <div>
        <el-table v-loading="loading" :data="category" border style="width: 100%;">
          <el-table-column prop="id" label="编号" width="100"></el-table-column>
          <el-table-column prop="name" label="名称">
            <template slot-scope="scope">
              <el-tag slot="reference">{{ scope.row.name }}({{ scope.row.child_count }})</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toChild(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pt-5">
          <el-pagination
              background
              layout="prev, pager, next"
              :page-size="20"
              :total="dataCount"
              :current-page.sync="currentPage"
              @current-change="load">
          </el-pagination>
        </div>
      </div>
    </section-block>

    <el-dialog title="添加商户" :visible.sync="addInput.dialogVisible" width="33vw" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <el-form label-position="right" label-width="100px">
          <el-form-item label="上级分类">
            <el-cascader :value="form.parent_idr" :props="cascadeOptions" clearable style="width: 100%" @change="cascadeSelect"></el-cascader>
          </el-form-item>

          <el-form-item label="分类名称">
            <el-input v-model="form.name" maxlength="10"></el-input>
          </el-form-item>

          <!--          <el-form-item label="分类图标">-->
          <!--            <el-input v-model="form.name"></el-input>-->
          <!--          </el-form-item>-->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addInput.dialogVisible = false">取 消</el-button>
        <el-button :loading="addInput.loading" type="primary" @click="submitForm('createForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Request from '@/utils/request'

  export default {
    name: "Category",
    data() {
      return {
        category: [],
        loading: false,
        dataCount: 0,
        currentPage: 1,
        form: {
          name: '',
          parent_id: null
        },
        addInput: {
          dialogVisible: false,
          loading: false
        },
        cascadeOptions: {
          lazy: true,
          label: 'name',
          value: 'id',
          checkStrictly: true,
          multiple: false,
          emitPath: false,
          lazyLoad(node, resolve) {
            let parentId

            if (node.level === 0) {
              parentId = 0
            } else {
              parentId = node.data.id
            }

            Request.get('category_list', {
              source: 'lazy',
              parent_id: parentId,
            }).then(data => {
              resolve(data.data)
            })
          }
        }
      }
    },

    created() {
      this.load()
    },

    methods: {
      load(page, parentId) {
        this.loading = true
        this.currentPage = page || 1,
          Request.get('category_list', {
            page: this.currentPage,
            parent_id: parentId || 0,
          }).then(response => {
            this.category = response.data.data
            this.dataCount = response.data.total
          }).finally(() => {
            this.loading = false
          })
      },

      submitForm() {
        this.addInput.loading = true

        Request.post('create_category', {
          name: this.form.name,
          parent_id: this.form.parent_id
        }).then(response => {
          this.$message.success('添加成功!')
          this.load()
          this.addInput.dialogVisible = false
          this.form = { name: '', parent_id: null }
        }).finally(() => {
          this.addInput.loading = false
        })
      },

      cascadeSelect(e) {
        this.form.parent_id = e
      },

      toChild(row) {
        if (row.child_count < 1) {
          return this.$message.error('没有下级分类了!');
        }

        this.load(1, row.id)
      },
    }
  }
</script>

<style scoped>

</style>
