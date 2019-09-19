<template>
  <div>
    <section-block title="商城推荐位">
      <template #action>
        <!--        <el-button type="primary" size="mini" @click="addInput.dialogVisible = true">添加推荐</el-button>-->
      </template>

      <el-button-group>
        <el-button type="primary" :plain="currentType !== 1" @click="currentType = 1">首页人气</el-button>
        <el-button type="primary" :plain="currentType !== 2" @click="currentType = 2">首页新品</el-button>
        <el-button type="primary" :plain="currentType !== 3" @click="currentType = 3">猜你喜欢</el-button>
      </el-button-group>

      <div class="pt-5"></div>

      <el-table v-loading="loading" :data="records" border style="width: 100%;">
        <el-table-column prop="id" label="编号" width="100"></el-table-column>
        <el-table-column prop="goods.name" label="商品名称"></el-table-column>
        <el-table-column prop="level_text" label="位置"></el-table-column>
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
    </section-block>
  </div>
</template>

<script>
  import Request from '@/utils/request'

  export default {
    name: "recommend",
    data() {
      return {
        currentType: 0,
        loading: false,
        dataCount: 0,
        records: [],
        addInput: {
          loading: false,
          dialogVisible: false,
        },
        form: {},
      }
    },

    watch: {
      currentType() {
        this.load(1)
      },
    },

    created() {
      this.load()
    },

    methods: {
      load(page) {
        this.loading = true

        Request.get('goods_recommend', {
          level: this.currentType,
          page: page || 1,
        }).then((res) => {
          this.records = res.data.data
          this.dataCount = res.data.total
        }).finally(() => this.loading = false)
      },

      refresh(id) {
        let loading = this.$loading({
          lock: true,
          text: '正在处理中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        Request.put('refresh_goods_recommend', {
          id: id
        }).then(() => {
          this.$message.success('刷新成功!')
          this.load(1)
        }).finally(() => loading.close())
      },

      cancel(id) {
        this.$confirm('确认要取消这个推荐吗?', '需要确认').then(() => {
          let loading = this.$loading({
            lock: true,
            text: '正在处理中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          Request.delete('cancel_goods_recommend', {
            id: id
          }).then(() => {
            this.$message.success('取消成功!')
            this.load(1)
          }).finally(() => loading.close())
        }).catch(() => {
        })

      },
    }
  }
</script>

<style scoped>

</style>
