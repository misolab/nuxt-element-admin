<template>
  <div>
    <section-block :title="form.id ? '查看商品' : '添加商品'" v-loading="loading">
      <el-form label-width="80px" label-position="right" :rules="validateRules" :model="form" ref="form">
        <el-row :gutter="20">
          <el-col :span="needCol">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="简短描述" prop="short_desc">
              <el-input v-model="form.short_desc"></el-input>
            </el-form-item>
            <el-form-item label="商品类目" prop="category_id">
              <el-cascader
                  clearable
                  style="width: 100%"
                  :class="{category: form.category}"
                  v-model="form.category_id"
                  :placeholder="categoryPlaceholder"
                  :props="cascadeOptions"
                  @change="cascadeSelect"></el-cascader>
            </el-form-item>
            <el-form-item label="商品商家" prop="merchant_id">
              <el-select v-model="form.merchant_id" filterable placeholder="请选择" style="width: 100%;" value="" :disabled="!!form.id">
                <el-option v-for="item in merchants" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上下架" prop="shelves">
              <el-switch v-model="form.shelves" active-color="#13ce66" active-text="上架" inactive-text="下架" :disabled="statusDisable"></el-switch>
            </el-form-item>

            <el-form-item label="商品类型" prop="is_virtual">
              <el-switch v-model="form.is_virtual" active-color="#13ce66" active-text="电子券" inactive-text="实物" :disabled="couponDisable"></el-switch>
            </el-form-item>

            <!-- 单规格类型 -->
            <div v-show="form.is_virtual && form.multiple_spec === false">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="券名称" prop="coupon_name">
                    <el-input v-model="form.coupon_name" placeholder="请输入券名称" maxlength="8"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="券数量" prop="coupon_num">
                    <el-input-number style="width: 100%;" v-model="form.coupon_num" :min="1"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="限制周期" prop="limit_cycle">
                    <el-input-number style="width: 100%;" v-model="form.limit_cycle" :min="1"></el-input-number>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="周期单位" prop="limit_unit">
                    <el-radio-group v-model="form.limit_unit">
                      <el-radio-button :label="1">天</el-radio-button>
                      <el-radio-button :label="2">月</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="限制数量" prop="limit_num">
                    <el-input-number style="width: 100%;" v-model="form.limit_num" :min="0" :max="form.coupon_num"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <el-form-item label="商品规格" prop="multiple_spec">
              <el-switch v-model="form.multiple_spec" active-color="#13ce66" active-text="多规格" inactive-text="单规格" :disabled="multipleSpecDisable"></el-switch>
            </el-form-item>

            <!-- 多规格 -->
            <transition name="el-fade-in-linear">
              <div v-show="form.multiple_spec">
                <el-form-item label="规格配置" prop="specs" class="mb-0 spec"></el-form-item>
                <div style="padding-left: 80px; position: relative" class="multiple_spec">
                  <div style="position: absolute; left: 20px; top:  10px;">
                    <el-button size="mini" type="primary" icon="el-icon-plus" @click="addSpec"></el-button>
                  </div>
                  <el-table style="width: 100%;" :data="form.specs" size="mini">
                    <el-table-column label="规格名称" width="120">
                      <template slot-scope="scope">
                        <el-input placeholder="规格名称" v-model.lazy="scope.row.name" maxlength="5"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="规格库存" width="100" align="center">
                      <template slot-scope="scope">
                        <el-tag v-if="scope.row.id">{{ scope.row.inventory }} / {{ scope.row.sold}}</el-tag>
                        <el-input placeholder="库存数量" v-model.lazy.number="scope.row.inventory" v-else></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="市场价">
                      <template slot-scope="scope">
                        <el-input-number style="width: 100%;" :precision="2" v-model.lazy="scope.row.market_price"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column label="优惠价">
                      <template slot-scope="scope">
                        <el-input-number style="width: 100%;" :precision="2" v-model.lazy="scope.row.discount_price"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column label="会员价">
                      <template slot-scope="scope">
                        <el-input-number style="width: 100%;" :precision="2" v-model.lazy="scope.row.vip_price"></el-input-number>
                      </template>
                    </el-table-column>

                    <el-table-column label="券名称" v-if="form.is_virtual">
                      <template slot-scope="scope">
                        <el-input placeholder="券名称" v-model.lazy="scope.row.coupon_name" maxlength="8"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="券数量" width="80" v-if="form.is_virtual">
                      <template slot-scope="scope">
                        <el-input placeholder="数量" v-model.lazy.number="scope.row.coupon_num"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="限制周期" width="80" v-if="form.is_virtual">
                      <template slot-scope="scope">
                        <el-input placeholder="周期" v-model.lazy.number="scope.row.limit_cycle"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="限制单位" width="110" v-if="form.is_virtual">
                      <template slot-scope="scope">
                        <el-radio-group v-model.lazy.number="scope.row.limit_unit" size="mini">
                          <el-radio-button :label="1">天</el-radio-button>
                          <el-radio-button :label="2">月</el-radio-button>
                        </el-radio-group>
                      </template>
                    </el-table-column>
                    <el-table-column label="限制数量" width="80" v-if="form.is_virtual">
                      <template slot-scope="scope">
                        <el-input type="number" placeholder="数量" v-model.lazy.number="scope.row.limit_num"></el-input>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" width="50">
                      <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="e => delSpec(scope.$index, scope.row)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </transition>

            <!-- 单规格 -->
            <div v-show="!form.multiple_spec">
              <el-form-item label="库存数量" prop="inventory">
                <el-input-number style="width: 100%;" v-model="form.inventory" :min="1" :disabled="!!form.id"></el-input-number>
              </el-form-item>

              <el-form-item label="市场价" prop="market_price">
                <el-input-number style="width: 100%;" v-model="form.market_price" :precision="2" :min="1"></el-input-number>
              </el-form-item>

              <el-form-item label="优惠价" prop="discount_price">
                <el-input-number style="width: 100%;" v-model="form.discount_price" :precision="2" :min="0"></el-input-number>
              </el-form-item>

              <el-form-item label="会员价" prop="vip_price">
                <el-input-number style="width: 100%;" v-model="form.vip_price" :precision="2" :min="0"></el-input-number>
              </el-form-item>
            </div>

          </el-col>
          <el-col :span="12">
            <div v-show="form.multiple_spec" style="padding: 20px 0 10px 0"></div>
            <el-form-item label="封面图" prop="thumb">
              <el-upload
                  class="avatar-uploader"
                  accept=".jpg,.png,.jpeg"
                  :headers="uploadHeaders"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                <img v-if="form.thumb" :src="form.thumb" class="avatar" alt="">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="详情图" prop="carousel_pic">
              <el-upload
                  accept=".jpg,.png,.jpeg"
                  list-type="picture-card"
                  :multiple="true"
                  :before-upload="beforeAvatarUpload"
                  :headers="uploadHeaders"
                  :action="uploadUrl"
                  :auto-upload="true"
                  :limit="9"
                  :file-list="carouselPic"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-exceed="handleExceed"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品介绍" prop="desc">
              <div id="editor"></div>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="padding-top: 20px">
          <el-button type="primary" size="big" @click="submitForm" :loading="formSaving">保存</el-button>
        </div>
      </el-form>
    </section-block>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import Request from '@/utils/request'
  import ValidateRules from '@/utils/create-goods-rules'

  let Editor = require('wangeditor')

  let SpecsField = {
    // 规格基本
    name: null,
    inventory: null,
    market_price: null,
    discount_price: null,
    vip_price: null,
    // 电子券
    coupon_name: null,
    coupon_num: null,
    limit_cycle: null,
    limit_num: 0,
    limit_unit: 1,
  }

  let CreateForm = {
    name: null,
    short_desc: null,
    desc: null,
    thumb: null,
    carousel_pic: [],
    merchant_id: null,
    category_id: null,
    shelves: false,
    is_virtual: false,
    multiple_spec: false,
    coupon_name: '',
    coupon_num: 1,
    limit_cycle: 1,
    limit_num: 0,
    limit_unit: 1,
    inventory: 1,
    market_price: 0,
    discount_price: 0,
    vip_price: 0,
    specs: [
      Object.assign({}, SpecsField),
      Object.assign({}, SpecsField)
    ],
  }

  export default {
    name: "create",
    data() {
      return {
        carouselPic: [],
        dialogImageUrl: null,
        dialogVisible: false,
        statusDisable: false,
        multipleSpecDisable: false,
        couponDisable: false,
        formSaving: false,
        validateRules: Object.assign({}, ValidateRules),
        form: Object.assign({}, CreateForm),
        categoryLoading: false,
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
        },
        merchants: [],
        loading: false,
      }
    },

    props: {
      id: {
        default: 0
      },
    },

    computed: {
      needCol() {
        return this.form.multiple_spec ? 24 : 12
      },

      categoryPlaceholder() {
        return this.form.category ? this.form.category.name : '请选择'
      },

      uploadUrl() {
        return Request.getApiUrl('upload')
      },

      uploadHeaders() {
        return {}
      },
    },

    watch: {
      'form.is_virtual': function (newVal, oldVal) {
        this.singleSpecNeedVerify(newVal && !this.form.multiple_spec)
        this.$store.commit('goods/setVirtual', newVal)
      },

      'form.multiple_spec': function (newVal, oldVal) {
        this.singleSpecNeedVerify(!newVal && this.form.is_virtual)
        this.singleSpecPriceVerify(!newVal)
        this.$store.commit('goods/setMultipleSpec', newVal)
      },
    },

    created() {
      this.$store.commit('goods/setVirtual', false)
      this.$store.commit('goods/setMultipleSpec', false)
    },

    mounted() {
      this.loadMerchant()
      this.initEditor()
      this.loadGoods()
    },

    methods: {
      handlePictureCardPreview(file, fileList) {
        this.dialogImageUrl = file.response.data
        this.dialogVisible = true
      },

      handleExceed() {
        this.$message.error('只能上传 9 张轮播图')
      },

      handleSuccess(response, file, fileList) {
        this.form.carousel_pic = fileList.map(file => {
          return {
            name: file.name,
            url: file.response.data,
          }
        })
      },

      // 删除图片
      handleRemove(file, fileList) {
        this.form.carousel_pic = fileList.map(file => {
          return {
            name: file.name,
            url: file.response.data,
          }
        })
      },

      handleAvatarSuccess(file) {
        this.form.thumb = file.data
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

      // 加载已有商品
      loadGoods() {
        if (this.id) {
          this.loading = true
          Request.get('goods_detail', {
            id: this.id
          }).then(res => {
            if (res.success) {
              this.statusDisable = true
              this.couponDisable = true
              this.multipleSpecDisable = true

              this.form = Object.assign(Object.assign({}, CreateForm), res.data)
              this.carouselPic = this.form.carousel_pic
              this.editor.txt.html(this.form.desc)
            }
          }).finally(() => {
            this.loading = false
          })
        }

      },

      // 单个规格价格是否需要验证
      singleSpecPriceVerify(valid) {
        this.validateRules.inventory.required = valid
        this.validateRules.market_price.required = valid
        this.validateRules.discount_price.required = valid
        this.validateRules.vip_price.required = valid
      },

      // 单个电子券字段是否验证
      singleSpecNeedVerify(valid) {
        this.validateRules.coupon_name.required = valid
        this.validateRules.coupon_num.required = valid
        this.validateRules.limit_cycle.required = valid
        this.validateRules.limit_num.required = valid
        this.validateRules.limit_unit.required = valid
      },

      submitForm() {
        console.log('submitForm');
        this.$refs['form'].validate(valid => {
          console.log(valid);
          if (valid) {
            this.formSaving = true
            if (this.id) {
              this.formUpdate()
            } else {
              this.formCreate()
            }
          } else {
            return false;
          }
        })
      },

      formUpdate() {
        Request.put('update_goods', Object.assign({
          desc_json: JSON.stringify(this.editor.txt.getJSON())
        }, this.form)).then(data => {
          if (data.success) {
            this.$confirm('商品更新成功, 请选择操作!', '添加成功', {
              confirmButtonText: '查看列表',
              cancelButtonText: '查看商品',
              type: 'success',
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false
            }).then(() => {
              this.$router.push({ name: 'goods' })
            })
          }
        }).finally(() => {
          this.formSaving = false
        })
      },

      formCreate() {
        Request.post('create_goods', Object.assign({
          desc_json: JSON.stringify(this.editor.txt.getJSON())
        }, this.form)).then(data => {
          if (data.success) {
            this.$confirm('商品添加成功, 请选择操作!', '添加成功', {
              confirmButtonText: '查看列表',
              cancelButtonText: '查看商品',
              type: 'success',
              showClose: false,
              closeOnClickModal: false,
              closeOnPressEscape: false
            }).then(() => {
              this.$router.push({ name: 'goods' })
            })
          }
        }).finally(() => {
          this.formSaving = false
        })
      },

      // 添加规格
      addSpec() {
        this.form.specs = this.form.specs.concat([Object.assign({}, SpecsField)])
      },

      // 删除规格
      delSpec(index, scope) {
        if (this.form.specs.length < 3) {
          return this.$alert('多规格至少需要填入 2 个以上规格产品', '错误', {
            showCancelButton: false
          })
        }

        this.$alert('确定要删除这个规格吗?', '确认', {
          showCancelButton: true
        }).then(() => {
          if (scope.id) {
            let loading = this.$loading({
              lock: true,
              text: '正在处理中...',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })

            // 服务端删除
            Request.delete('delete_goods_spec', {
              id: scope.id,
              goods_id: scope.goods_id,
            }).then(res => {
              if (res.success) {
                this.form.specs.splice(index, 1)
              }
            }).finally(() => {
              loading.close()
            })
          } else {
            this.form.specs.splice(index, 1)
          }
        })
      },

      // 编辑器就绪
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },

      // 初始化编辑器
      initEditor() {
        this.editor = new Editor('#editor')
        this.editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          // 'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          // 'quote',  // 引用
          // 'emoticon',  // 表情
          'image',  // 插入图片
          // 'table',  // 表格
          // 'video',  // 插入视频
          // 'code',  // 插入代码
          // 'undo',  // 撤销
          // 'redo'  // 重复
        ]

        this.editor.customConfig.uploadImgServer = Request.getApiUrl('upload')
        this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024
        this.editor.customConfig.uploadImgMaxLength = 1
        this.editor.customConfig.uploadImgParams = {
          source: 'editor',
        }
        this.editor.customConfig.uploadImgHooks = {
          customInsert: function (insertImg, result, editor) {
            // console.log(result)
            insertImg(result.data)
          }
        }
        this.editor.customConfig.customAlert = info => this.$alert(info)
        this.editor.customConfig.uploadFileName = 'file'
        this.editor.customConfig.onchange = html => this.form.desc = html

        this.editor.create()
      },

      // 选择分类
      cascadeSelect(e) {
        this.form.category_id = e
      },

      // 加载商家
      loadMerchant() {
        Request.get('merchant_list', {
          all: true
        }).then(response => {
          this.merchants = response.data
        }).finally(() => {
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .multiple_spec /deep/ .el-input--small .el-input__inner {
    padding: 5px;
    text-align: center;
  }

  .mb-0 {
    margin-bottom: 0 !important;
  }

  .spec /deep/ .el-form-item__error {
    padding-top: 0;
    font-size: 14px;
    line-height: 30px;
    position: unset;
  }

  .category /deep/ input::placeholder {
    color: #606266;
  }

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
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }

  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>
