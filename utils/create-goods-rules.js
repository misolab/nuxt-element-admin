export default {
  name: [
    { required: true, message: '请填写商品名称', }
  ],
  desc: [{ required: true, message: '请填写商品介绍', }],
  short_desc: [{ required: true, message: '请填写商品描述', }],
  category_id: [{ required: true, message: '请选择商品类目', }],
  merchant_id: [{ required: true, message: '请选择出售商家', }],
  shelves: [{ required: true, message: '请选择上下架状态', }],
  is_virtual: [{ required: true, message: '请选择商品类型', }],
  multiple_spec: [{ required: true, message: '请填写商品规格', }],

  inventory: { required: true, type: 'integer', message: '请正确填写库存数量', },
  market_price: { required: true, type: 'number', message: '请正确市场价格', min: 1 },
  discount_price: { required: true, type: 'number', message: '请正确填写优惠价格', },
  vip_price: { required: true, type: 'number', message: '请正确填写会员价格', },

  coupon_name: { required: false, type: 'string', message: '请填写商品规格', },
  coupon_num: { required: false, type: 'integer', message: '请填写商品数量', },
  limit_cycle: { required: false, type: 'integer', message: '请填写限制周期', },
  limit_num: { required: false, type: 'integer', message: '请填写限制周期数量', min: 0 },
  limit_unit: { required: false, type: 'enum', enum: [1, 2], message: '请选择周期单位', },

  carousel_pic: { required: true, type: 'array', mix: 1, max: 9, message: '请正确上传1-9张轮播图片' },
  thumb: { required: true, type: 'url', message: '请正确上传封面图' },

  specs: [
    { type: 'array', required: true, message: '请正确填写规格信息', },
    {
      validator(rule, value, callback, source, options) {
        if (!$nuxt.$store.state.goods.multiple_spec) {
          return callback()
        }

        let isVirtual = $nuxt.$store.state.goods.is_virtual

        for (let [index, val] of value.entries()) {
          if (!val.name) {
            return callback(new Error(`第 ${index + 1} 个规格 名称 填写错误!`))
          }

          if (val.inventory < 1) {

            return callback(new Error(`第 ${index + 1} 个规格 库存 填写错误!`))
          }

          if (val.market_price < 0.01) {
            return callback(new Error(`第 ${index + 1} 个规格 市场价 填写错误!`))
          }

          if (val.discount_price > val.market_price) {
            return callback(new Error(`第 ${index + 1} 个规格 优惠价应低于市场价!`))
          }

          if (val.vip_price > val.discount_price) {
            return callback(new Error(`第 ${index + 1} 个规格 会员价应低于优惠价!`))
          }

          if (!isVirtual) {
            continue
          }

          if (!val.coupon_name) {
            return callback(new Error(`第 ${index + 1} 个规格 电子券名称未填写!`))
          }

          if (val.coupon_num < 1) {
            return callback(new Error(`第 ${index + 1} 个规格 电子券数量错误!`))
          }

          if (val.limit_cycle < 1) {
            return callback(new Error(`第 ${index + 1} 个规格 电子券限制周期最小 1!`))
          }

          if (val.limit_num < 0) {
            return callback(new Error(`第 ${index + 1} 个规格 电子券限制数量最小值 0!`))
          }

          if (val.limit_unit !== 1 && val.limit_unit !== 2) {
            return callback(new Error(`第 ${index + 1} 个规格 电子券限制周期为 天 或者 月!`))
          }
        }

        return callback()
      }
    }
  ],
}
