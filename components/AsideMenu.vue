<template>
  <div>
    <el-menu class="menu-vertical" @select="selectMenu" @close="handleClose" :collapse="collapse" router>
      <template v-for="menu in menus">
        <el-menu-item :index="menu.key" :route="{path: menu.path}">
          <i class="icon" :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </template>

      <!--      <el-submenu index="1">-->
      <!--        <template slot="title">-->
      <!--          <i class="icon el-icon-s-home"></i>-->
      <!--          <span slot="title">首页</span>-->
      <!--        </template>-->
      <!--        <el-menu-item index="1-1">选项1</el-menu-item>-->
      <!--        <el-menu-item index="1-2">选项2</el-menu-item>-->
      <!--        <el-submenu index="1-4">-->
      <!--          <span slot="title">选项4</span>-->
      <!--          <el-menu-item index="1-4-1">选项1</el-menu-item>-->
      <!--        </el-submenu>-->
      <!--      </el-submenu>-->
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
        menus: Menu
      };
    },
    methods: {
      selectMenu(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
