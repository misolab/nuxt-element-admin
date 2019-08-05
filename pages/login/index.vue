<template>
  <div>
    <script @load="jsLoad" :src="dingJsUrl"></script>
    <div class="login-container">
      <div class="flex">
        <div class="w-1/2">
          <div class="section">
            <div class="text-center">
              <h4 style="color: #909399; font-size: 16px;" class="pt-4">欢迎访问控制中心</h4>
            </div>
            <div>
              <div id="login-qr" class="login-qr flex items-center justify-center">
              </div>
            </div>
          </div>

        </div>
        <div class="w-1/2">
          <div class="right-img"></div>
        </div>
      </div>
    </div>
    <footer>
      <Copyright></Copyright>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "index",
    layout: 'auth-login',
    head() {
      return {
        title: '登录控制中心'
      }
    },
    data() {
      return {
        dingJsUrl: '//g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js',
      }
    },
    computed: {},
    methods: {
      jsLoad(e) {
        let login = DDLogin({
          id: "login-qr",
          goto: encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoanbaoiqyaoegblqir&response_type=code&scope=snsapi_login&state=${Date.now()}&redirect_uri=http://best-dev.antapis.com/oauth/ding-login`),
          style: "border:none;background-color:transparent;",
          width: "300",
          height: "300"
        })

        if (typeof window.addEventListener != 'undefined') {
          window.addEventListener('message', this.handleMessage, false)
        } else if (typeof window.attachEvent != 'undefined') {
          window.attachEvent('onmessage', this.handleMessage)
        }
      },

      handleMessage() {
        let origin = event.origin;
        if (origin == "https://login.dingtalk.com") {
          let loginTmpCode = event.data
        }
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
