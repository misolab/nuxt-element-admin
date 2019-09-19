<template>
  <div>
    <section-block :title="title">
      <template #action>
<!--        <el-button type="primary" size="mini" @click="addInput.dialogVisible = true">添加地区</el-button>-->
        <el-button type="primary" size="mini" @click="reloadPage">刷新</el-button>
      </template>

      <el-tree
          lazy
          node-key="id"
          empty-text="请先添加地区"
          :props="{label: 'name', value:'code', 'isLeaf': isLastNode}"
          :load="loadChildren"
      >
        <div class="" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
<!--          <span v-if="data.is_village"><el-button type="text" size="mini" @click.stop="() => addChildren(data, node)">增加片区</el-button></span>-->
        </div>
      </el-tree>
    </section-block>

    <el-dialog title="添加地区" :visible.sync="addInput.dialogVisible" width="33vw" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="pb-2">
        <el-input required placeholder="请输入地区名称" v-model.trim="addInput.name">
          <template slot="prepend"><i class="el-icon-s-help"></i> 地区名称</template>
        </el-input>
      </div>
      <div>
        <el-input required placeholder="请输入描述" v-model.trim="addInput.desc">
          <template slot="prepend"><i class="el-icon-info"></i> 备注描述</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addInput.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInputConfirm" :loading="addInput.loading" :disabled="addInput.loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "detail",

    inject: ['reloadPage'],

    data() {
      return {
        area: {
          name: ''
        },
        addInput: {
          id: null,
          level: null,
          name: '',
          desc: '',
          loading: false,
          dialogVisible: false,
        },
      }
    },

    computed: {
      title() {
        return `${this.$route.params.area.name} 地区列表`
      },
    },

    validate({ params }) {
      return /^\d+$/.test(params.id)
    },

    created() {
    },

    methods: {
      isLastNode(data, node) {
        return data.is_village
      },

      addChildren(data, node) {
        this.addInput.level = data.level + 1
        this.addInput.id = data.id
        this.addInput.dialogVisible = true
      },

      loadChildren(node, resolve) {
        let cityCode = this.$route.params.area.city_code, areaCode = this.$route.params.area.code, streetCode = ''
        if (node.level == 1 && node.data) {
          streetCode = node.data.code
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
        if (!this.addInput.name || !this.addInput.desc) {
          return this.$message.error('请填写内容!')
        }

        this.addInput.loading = true
        this.$axios.post('area', {
          id: this.addInput.id || this.$route.params.id,
          level: this.addInput.level || 2,
          name: this.addInput.name,
          desc: this.addInput.desc,
        }).then(data => {
          this.$message.success('创建成功!')
          this.addInput = {
            level: null,
            id: null,
            name: '',
            desc: '',
            loading: false,
            dialogVisible: false,
          }
          return this.reloadPage()
        }).catch(err => {

        }).finally(() => this.addInput.loading = false)
      },
    }
  }
</script>

<style scoped>

</style>
