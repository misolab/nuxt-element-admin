<template>
  <div>
    <section-block title="商品列表">
      <template #action>
        <el-button type="primary" size="mini" @click="$router.push({name: 'goods-create'})">添加商品</el-button>
      </template>

      <div>
        <el-table v-loading="loading" :data="goods" border style="width: 100%;">
          <el-table-column prop="id" label="编号" width="80" align="center"></el-table-column>
          <el-table-column prop="name" label="类型" width="85" align="center">
            <template slot-scope="scope">
              <el-tag size="mini" type="primary" v-if="scope.row.multiple_spec">多规格({{ scope.row.specs_count }})</el-tag>
              <el-tag size="mini" type="success" v-if="scope.row.is_virtual">电子券</el-tag>
              <el-tag size="mini" v-if="!scope.row.multiple_spec && !scope.row.is_virtual">普通商品</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="in_sale" label="状态" width="80" align="center">
            <template slot-scope="scope">
              <el-tag size="mini" type="success" v-if="scope.row.in_sale">上架</el-tag>
              <el-tag size="mini" type="primary" v-else>下架</el-tag>
              <el-tag size="mini" type="info" v-if="scope.row.sold_out">售罄</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="售出/库存" width="100" align="center">
            <template slot-scope="scope">
              <el-tag size="mini">{{ scope.row.sold }}/{{ scope.row.inventory }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="category" label="类目">
            <template slot-scope="scope">
              <span>{{ scope.row.category.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="merchant" label="商家">
            <template slot-scope="scope">
              <el-tag size="mini">{{ scope.row.merchant.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="发布时间" width="140" align="center"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="danger" @click="toggleSale(scope.row.id, scope.row.in_sale)">{{ scope.row.in_sale ? '下架' : '上架' }}</el-button>
                <el-button size="mini" type="primary" @click="toGoodsDetail(scope.row.id)">查看</el-button>
                <el-button
                    size="mini"
                    type="success"
                    @click="()=>{recommend.goodsId = scope.row.id; recommend.goodsName = scope.row.name; recommend.dialogVisible = true}"
                >推荐
                </el-button>
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

    <el-dialog title="设置商品推荐" :visible.sync="recommend.dialogVisible" width="33vw"
        :close-on-click-modal="false" :close-on-press-escape="false"
    >
      <p>将商品 {{ recommend.goodsName }} 设置为: </p>
      <div class="pt-2">
        <el-radio-group v-model="recommend.value" size="mini">
          <el-radio :label="1">首页人气</el-radio>
          <el-radio :label="2">首页新品</el-radio>
          <el-radio :label="3">猜你喜欢</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="recommend.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="recommendSave" :loading="recommend.saving">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Request from '@/utils/request'

  export default {
    name: "index",
    data() {
      return {
        recommend: {
          dialogVisible: false,
          saving: false,
          goodsId: null,
          goodsName: null,
          value: null,
        },
        toggleLoading: false,
        loading: false,
        dataCount: 0,
        currentPage: 1,
        goods: [],
      }
    },

    created() {
      this.load()
    },

    methods: {
      // load
      load(page) {
        Request.get('goods_list', {
          page: page || 1
        }).then(response => {
          this.goods = response.data.data
          this.dataCount = response.data.total
          this.currentPage = response.data.current_page
        }).finally(() => {
          this.loading = false
        })
      },

      // 商品详细
      toGoodsDetail(id) {
        this.$router.push({
          name: 'goods-detail',
          query: {
            id: id
          },
        })
      },

      // 上下架
      toggleSale(id, status) {
        let msg = status ? '确定要下架该商品?' : '确定要上架该商品?';
        this.$confirm(msg, '确认').then(() => {

          this.toggleLoading = this.$loading({
            lock: true,
            text: '正在处理中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          Request.put('goods_toggle_sale', {
            id: id,
            status: status,
          }).then(res => {
            this.$message.success('操作完成')
            this.load(this.currentPage)
          }).finally(() => this.toggleLoading.close())
        }).catch(() => {
        });
      },

      // 商品推荐
      recommendSave() {
        if (this.recommend.goodsId && this.recommend.value) {
          this.recommend.saving = true
          return Request.post('add_goods_recommend', {
            goods_id: this.recommend.goodsId,
            level: this.recommend.value
          }).then(res => this.$message.success('成功设置为推荐商品!'))
            .catch(() => this.$message.error('设置推荐商品失败!'))
            .finally(() => this.recommend = {
              dialogVisible: false,
              saving: false,
              goodsId: null,
              goodsName: null,
              value: null,
            }
          )
        }

        this.$message.error('请选择推荐位置')
      },
    },
  }
</script>

<style scoped>

</style>
