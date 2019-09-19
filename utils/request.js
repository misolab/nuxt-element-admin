import axios from 'axios'
import { Message } from 'element-ui'

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.status === 200 && response.data.success) {
    return response.data
  }

  let msg = response.data.message || '请求数据失败!'
  Request.error(msg)
  return Promise.reject(msg)
}, function ({ message, response }) {
  if (response.status === 422) {
    Request.error(JSON.stringify(response.data.errors))
  } else {
    Request.error(message)
  }

  return Promise.reject(message)
})

const Request = {
  https: false,
  base_url: '0.0.0.0:8000/console-api',
  // base_url: 'best-dev.antapis.com/api/console',
  api: {
    upload: 'common/upload',
    merchant_list: 'merchant/list',
    create_merchant: 'merchant/create',
    merchant_store: 'merchant/store',
    create_store: 'merchant/store',
    category_list: 'goods/category',
    create_category: 'goods/category',
    create_goods: 'goods/create',
    update_goods: 'goods/update',
    goods_list: 'goods/list',
    goods_detail: 'goods/detail',
    goods_toggle_sale: 'goods/toggle-sale',
    delete_goods_spec: 'goods/spec',
    goods_recommend: 'mall/recommend',
    refresh_goods_recommend: 'mall/recommend',
    add_goods_recommend: 'mall/recommend',
    cancel_goods_recommend: 'mall/recommend',
    mall_carousel: 'mall/carousel',
    refresh_carousel: 'mall/carousel',
    add_mall_carousel: 'mall/carousel',
    cancel_mall_carousel: 'mall/carousel',
  },

  getApiUrl(api) {
    return `${this.https ? 'https://' : 'http://'}${this.base_url}/${this.api[api]}`
  },

  get(api, params) {
    return axios.get(this.getApiUrl(api), {
      params: params
    })
  },

  post(api, data, params) {
    return axios.post(this.getApiUrl(api), data, {
      params: params
    })
  },

  put(api, data, params) {
    return axios.put(this.getApiUrl(api), data, {
      params: params
    })
  },

  delete(api, params) {
    return axios.delete(this.getApiUrl(api), {
      params: params
    })
  },

  error(msg) {
    Message.error(msg)
  },

  error422(errors) {
    Message({
      dangerouslyUseHTMLString: true,
      type: 'error',
      duration: 5000,
      message: `<p>提交的数据验证不通过!</p><p>${JSON.stringify(errors)}</p>`
    })
  },

}

export default Request
