<template>
  <div>
    <el-menu class="menu-vertical"
        router
        @select="selectMenu"
        @close="handleClose"
        :collapse="collapse"
        :default-active="activeRoute">
      <template v-for="menu in menus">
        <el-menu-item
            :index="menu.key"
            :route="{path: menu.path}"
            v-if="menu.children == false"
            :key="menu.key"
        >
          <i class="icon" :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>

        <el-submenu :index="menu.key" v-else>
          <template slot="title">
            <i class="icon" :class="menu.icon"></i>
            <span slot="title">{{ menu.name }}</span>
          </template>
          <el-menu-item
              v-for="subMenu in menu.children"
              :index="subMenu.key"
              :route="{ path: subMenu.path }"
              :key="subMenu.key"
          >
            <span>{{ subMenu.name }}</span>
          </el-menu-item>
        </el-submenu>

      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
  .icon {
    font-size: 20px;
  }

  .menu-vertical:not(.el-menu--collapse) {
    width: 256px;
  }

  .el-menu--collapse {
    width: 80px;

    .collapse-text-center {
      text-align: center;
    }
  }

</style>

<script>
  import Menu from '~/config/menu.js'

  export default {
    name: 'AsideMenu',
    props: [
      'collapse'
    ],

    data() {
      return {
        activeRoute: 'index',
        menus: Menu
      };
    },

    created() {
      this.activeRoute = this.parseRoute(this.$route.path)
    },

    watch: {
      '$route'(newVal, oldVal) {
        console.log(newVal)
        this.activeRoute = this.parseRoute(newVal.path)
      }
    },

    methods: {
      parseRoute(fullPath) {
        if (fullPath == '/') {
          return 'index'
        }
        let segmentation = fullPath.split('/')
        if (segmentation[0] === '') {
          segmentation.shift()
        }

        if (segmentation.length < 2) {
          return segmentation[0]
        }

        let res = segmentation.filter(item => {
          return !(/^\d+$/.test(item))
        })

        return res.join('-')
      },

      selectMenu(key, keyPath) {
        console.log('selectMenu', key, keyPath);
      },

      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
