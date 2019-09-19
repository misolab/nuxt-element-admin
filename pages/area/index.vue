<template>
  <div>
    <section-block title="区域列表">
      <template #action>
        <el-button type="primary" size="mini" @click="addInput.dialogVisible = true">添加顶级区域</el-button>
      </template>

      <el-row :gutter="0">
        <el-col :span="6" v-for="area in localAreas" :key="area.code">
          <el-card shadow="hover">
            <div class="">
              <div class="pb-2">
                <div class="text-xl">{{ area.name }}</div>
                <div class="text-sm text-gray-700">
                  <p>{{ area.code }}</p>
                </div>
              </div>

              <div>
                <el-button size="mini" type="primary" @click="$router.push({name: 'area-id', params:{id: area.code, area: area}})">查看</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section-block>

    <el-dialog title="添加顶级区域" :visible.sync="addInput.dialogVisible" width="33vw" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form>
        <el-form-item label="关联地区">
          <el-cascader style="width: 100%" v-model="addInput.area" :props="areaProps"></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addInput.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInputConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        areaProps: {
          emitPath: false,
          leaf: 'is_area',
          lazy: true,
          expandTrigger: 'click',
          lazyLoad: this.areaLazyLoad,
          label: 'name',
          value: 'code',
        },
        localAreas: [],
        addInput: {
          area: '',
          loading: false,
          dialogVisible: false,
        },
      }
    },

    created() {
      this.onLoad()
    },

    methods: {
      onLoad() {
        this.$axios.get('area/visible').then(data => {
          this.localAreas = data.data
        })
      },

      areaLazyLoad(node, resolve) {
        let cityCode = '', areaCode = '', streetCode = ''
        if (node.level == 1 && node.data) {
          cityCode = node.data.code
        }

        if (node.level == 2 && node.data) {
          cityCode = node.data.city_code
          areaCode = node.data.code
        }

        if (node.level == 3 && node.data) {
          cityCode = node.data.city_code
          areaCode = node.data.area_code
          streetCode = node.data.code
        }

        if (node.level > 3) {
          return resolve([])
        }

        let url = `area/${cityCode}/${areaCode}/${streetCode}`
        console.log(url, node)

        this.$axios.get(url).then(data => {
          resolve(data.data)
        })
      },

      addInputConfirm() {
        if (!this.addInput.area) {
          return this.$message.error('请填写内容!')
        }

        this.addInput.loading = true
        this.$axios.put(`area/visible/${this.addInput.area}`, {}).then(data => {
          this.$message.success('创建成功!')
          this.addInput = {
            area: '',
            loading: false,
            dialogVisible: false,
          }
          return this.onLoad()
        }).catch(err => {

        }).finally(() => this.addInput.loading = false)
      },
    }
  }
</script>

<style scoped>

</style>
