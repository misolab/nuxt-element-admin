<template>
  <div>
    <section-block title="自取点管理">
      <template #action>
        <el-button type="primary" @click="addInput.dialogVisible = true">添加自取点</el-button>
      </template>
    </section-block>

    <el-dialog title="添加自取点" :visible.sync="addInput.dialogVisible" width="33vw" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form label-position="top">
        <div class="pb-2">
          <el-input required placeholder="请输入自取点名称" v-model.trim="addInput.name">
            <template slot="prepend"><i class="el-icon-s-help"></i> 自取点名称</template>
          </el-input>
        </div>
        <div class="pb-2">
          <el-input required placeholder="请输入描述" v-model.trim="addInput.desc">
            <template slot="prepend"><i class="el-icon-info"></i> 自取点描述</template>
          </el-input>
        </div>
        <div class="pb-2">
          <el-input required placeholder="请输入地址" v-model.trim="addInput.address">
            <template slot="prepend"><i class="el-icon-location-information"></i> 自取点地址
            </template>
          </el-input>
        </div>
        <el-divider></el-divider>
        <el-form-item label="关联地区">
          <el-cascader style="width: 100%" v-model="addInput.area" :props="areaProps" @change="handleChange"></el-cascader>
        </el-form-item>

        <el-form-item label="开放时间">
          <el-time-picker
              is-range
              style="width: 100%;"
              prefix-icon=""
              size="small"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
              v-model="addInput.time"
          >
          </el-time-picker>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addInput.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInputConfirm" :loading="addInput.loading" :disabled="addInput.loading">确 定</el-button>
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
          leaf: 'is_village',
          lazy: true,
          expandTrigger: 'click',
          lazyLoad: this.areaLazyLoad,
          label: 'name',
          value: 'code',
        },
        addInput: {
          name: '',
          desc: '',
          address: '',
          area: '',
          time: null,
          loading: false,
          dialogVisible: false,
        },
      }
    },

    methods: {
      areaLazyLoad(node, resolve) {
        if (node.level === 0) {
          this.$axios.get('area/visible').then(data => {
            resolve(data.data)
          })

          return;
        }

        let cityCode = node.data.city_code, areaCode = '', streetCode = '';

        if (node.data.is_area) {
          areaCode = node.data.code
        } else if (node.data.is_street) {
          areaCode = node.data.area_code
          streetCode = node.data.code
        }

        let url = `area/${cityCode}/${areaCode}/${streetCode}`
        console.log(url, node)

        this.$axios.get(url).then(data => {
          resolve(data.data)
        })
      },

      handleChange() {

      },

      addInputConfirm() {

      }
    },
  }
</script>

<style scoped>

</style>
