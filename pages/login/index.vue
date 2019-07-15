<template>
  <div>
    <script @load="wxJsLoad" :src="wxJsUrl"></script>
    <div class="login-container">
      <div class="flex">
        <div class="w-1/2">
          <div class="section">
            <div class="">
              <h3 style="color: #303133; font-size: 20px;">嗨玩</h3>
              <h4 style="color: #909399; font-size: 16px;">领先的本地互联网生活服务平台</h4>
            </div>
            <div>
              <div id="login-qr" class="login-qr flex items-center justify-center">
              </div>
            </div>
            <el-button-group style="width: 100%;">
              <el-button size="small" class="w-1/2">免费入住</el-button>
              <el-button size="small" class="w-1/2">联系客服</el-button>
            </el-button-group>
          </div>

        </div>
        <div class="w-1/2">
          <div class="right-img"></div>
        </div>
      </div>
    </div>
    <footer>
      &copy; 嗨玩 2019
    </footer>
  </div>
</template>

<script>
  export default {
    name: "index",
    layout: 'auth-login',
    head() {
      return {
        title: '登录嗨玩商户管理中心'
      }
    },
    computed: {
      wxJsUrl() {
        return `http${process.env.isLocal ? '' : 's'}://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js`
      },
    },
    methods: {
      wxJsLoad(e) {
        let login = new WxLogin({
          self_redirect: true,
          id: "login-qr",
          appid: "wx85af5dd8c39af771",
          scope: "snsapi_login",
          redirect_uri: encodeURIComponent(`http${process.env.isLocal ? '' : 's'}://www.hiplaylife.com/auth/open-wechat?source=m_login`),
          state: Date.now(),
          style: "",
          href: `${process.env.isLocal ? 'http://localhost:3000' : window.location.href}/style/wxlogin.css`
        })
      },
    },
  }
</script>

<style scoped>
  .login-container {
    position: fixed;
    width: 712px;
    height: 512px;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    box-shadow: 0 0 30px #ccc;
    border-radius: 6px;
    overflow: hidden;
  }

  .right-img {
    width: 100%;
    height: 512px;
    background: url("~assets/images/light.jpg") no-repeat 50% 50%;
    background-size: cover;
  }

  .section {
    padding: 16px;
  }

  .login-qr >>> iframe {
    height: 380px !important;
  }

  footer {
    position: fixed;
    bottom: 18px;
    width: 100%;
    color: #909399;
    text-align: center
  }

</style>
