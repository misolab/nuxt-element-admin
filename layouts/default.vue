<template>
  <div id="layout-default" class="">
    <div class="layout-container flex flex-col overflow-hidden">
      <div class="header flex justify-between items-center text-gray-500 shadow-xl">
        <div class="flex justify-start items-center">
          <div class="logo">
            <img src="https://cdn.hiplaylife.com/console/assets/img/logo-yellow.png" alt="">
          </div>
          <HeaderNav :tabs="tabs" :current="route" @change-route="routeChange"></HeaderNav>
        </div>
        <div class="flex justify-start items-center">
          <Profile></Profile>
        </div>
      </div>
      <div class="main">
        <div class="relative p-5" ref="mainBox">
          <nuxt></nuxt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from './../utils/auth'
  import Tabs from './../utils/tabs'
  import Sidebar from './../components/page/Sidebar'
  import HeaderNav from './../components/HeaderNav'
  import Profile from './../components/HeaderProfile'

  export default {
    components: {HeaderNav, Profile},

    data() {
      return {
        tabs: Tabs,
        route: {currentTab: 'index', currentSubmenu: null, currentName: null},
      }
    },

    created() {
      let tabName = this.$route.name.split('-')
      // console.log(tabName, this.$route.name)

      let tab = this.tabs.find(item => {
        return item.key === tabName[0]
      })

      let submenu = tabName.length === 1 ? null : tab.submenu.find(item => {
        return item.key === this.$route.name
      })

      this.setRoute(tab, submenu)
    },

    mounted() {
    },

    methods: {
      routeChange(e) {
        this.setRoute(e.tab, e.sub)
      },

      setRoute(tab, submenu) {
        this.route.currentTab = tab.key
        this.route.currentSubmenu = submenu
        this.route.currentName = tab.name
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
