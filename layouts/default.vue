<template>
  <div id="layout-default" class="">
    <div class="layout-container flex flex-col overflow-hidden">
      <div class="header flex justify-between items-center text-gray-500 shadow-xl">
        <div class="flex justify-start items-center">
          <div class="logo">
            <img src="https://cdn.hiplaylife.com/console/assets/img/logo-yellow.png" alt="">
          </div>
          <HeaderNav :tabs="tabs" :current="route.currentTab" @change-nav="headerNavChange"></HeaderNav>
        </div>
        <div class="flex justify-start items-center">
          <Profile></Profile>
        </div>
      </div>
      <div class="main flex flex-col justify-start items-stretch overflow-hidden">
        <div class="sidebar">
          <Sidebar :submenu="route.currentSubmenu" :name="route.currentName"></Sidebar>
        </div>
        <div class="relative p-5" ref="mainBox">
          <nuxt></nuxt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from './../utils/auth'
  import Sidebar from './../components/page/Sidebar'
  import HeaderNav from './../components/HeaderNav'
  import Profile from './../components/HeaderProfile'

  export default {
    components: {Sidebar, HeaderNav, Profile},

    data() {
      return {
        mainBoxHeight: 0,

        tabs: [
          {key: 'index', 'name': '首页', icon: 'icon-shouye', submenu: false},
          {key: 'goods', 'name': '商品', icon: 'icon-paihangbang', submenu: []},
          {key: 'order', 'name': '订单', icon: 'icon-dingdan'},
          {key: 'comment', 'name': '评价', icon: 'icon-huati'},
          {
            key: 'store', 'name': '门店', icon: 'icon-shangquan',
            submenu: [
              {key: 'store', 'name': '门店列表', icon: 'icon-shangquan'},
              {key: 'store-staff', 'name': '人员列表', icon: 'icon-shangquan'}
            ]
          },
          {key: 'finance', 'name': '财务', icon: 'icon-yulebao'},
          {key: 'setting', 'name': '设置', icon: 'icon-shezhi'},
        ],
        route: {
          currentTab: 'index',
          currentSubmenu: false,
          currentName: '',
        },
      }
    },

    created() {
      let currentName = this.$route.name.split('-')

      this.setRoute(this.tabs.find(item => {
        return item.key === currentName[0]
      }))
    },

    mounted() {
    },

    methods: {
      headerNavChange(e) {
        this.setRoute(e)
      },

      setRoute(route) {
        this.route.currentTab = route.key
        this.route.currentSubmenu = route.submenu
        this.route.currentName = route.name
      },
    }
  }
</script>

<style scoped lang="scss">
  .full-screen {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background: url("https://cdn.hiplaylife.com/console/assets/img/bg-sierra.jpg?imageslim") no-repeat center top;
  }

  .padding-box {
    padding: 1% 1%;
  }

  .layout-container {
    box-sizing: border-box;
    padding-top: 80px;
  }

  .header {
    width: 100%;
    height: 80px;
    background: rgba(57, 62, 70, 1);
    position: fixed;
    top: 0;
    z-index: 99;
  }

  .logo {
    padding: 0 10px;

    img {
      width: 40px;
    }
  }
</style>
