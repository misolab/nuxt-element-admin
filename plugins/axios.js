import Message from "element-ui/packages/message/src/main";
import RequestHandler from "~/utils/request"

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onRequestError(error => {
    console.log('onRequestError', error)
  })

  $axios.onResponse(response => {
    if (response.status === 200 && response.data.success) {
      return response.data
    }

    let msg = response.data.message || '请求数据失败!'
    RequestHandler.error(msg)
    return Promise.reject(msg)
  })

  $axios.onResponseError(error => {
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 422) {
      RequestHandler.error422(error.response.data.errors)
    }
  })
}
