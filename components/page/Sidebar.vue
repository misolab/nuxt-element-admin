<template>
  <transition name="slide-fade">
    <div class="sidebar text-gray-500" v-show="submenu">
      <div class="sidebar-nav flex flex-row justify-center">
        <template v-for="item in submenu">
          <div class="nav-item" :class="{active: currentTab === item.key}" @click="toPage(item)">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Sidebar",
    props: {
      submenu: [Boolean, Array],
      name: String
    },
    data() {
      return {
        currentTab: ''
      }
    },

    created() {
      // console.log( this.$route.name)
      this.currentTab = this.$route.name
    },

    methods: {
      toPage(route) {
        this.currentTab = route.key
        this.$router.push({name: route.key})
      },
    }
  }
</script>

<style scoped lang="scss">
  .page-name {
    font-size: 16px;
    padding: 30px 20px;
  }

  .sidebar {
    background: #222831;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-100%);
    /*opacity: 0;*/
  }

  .sidebar-nav {
    .nav-item {
      box-sizing: border-box;
      padding: 10px 10px;
      cursor: pointer;
      /*border-top: 1px solid #222831;*/
      /*border-bottom: 1px solid #222831;*/

      &:hover, &.active {
        color: #FFFF41;
        /*background: #0d1016;*/
        /*border-top: 1px solid #313946;*/
        /*border-bottom: 1px solid #313946;*/
      }
    }
  }
</style>
