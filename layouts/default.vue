<template>
  <section class="layout">
    <aside class="layout-aside aside-fixed" :class="{'aside-collapse': collapseAside}">
      <logo :collapse="collapseAside"></logo>
      <aside-menu :collapse="collapseAside"></aside-menu>
    </aside>

    <section class="layout layout-main" :style="{ paddingLeft: collapseAside ? '80px' : '256px'  }">
      <div class="layout-header flex justify-between items-center text-gray-600">
        <div class="flex justify-start items-center">
          <!--          <div class="logo">-->
          <!--            <img src="~/assets/images/logo-yellow.png" alt="">-->
          <!--          </div>-->
          <div class="collapse-btn" @click="()=>this.collapseAside = !this.collapseAside">
            <i class="el-icon-s-fold"></i>
          </div>
        </div>
        <header-profile></header-profile>
      </div>
      <div class="relative" ref="mainBox" style="padding: 20px">
        <transition name="el-fade-in">
          <nuxt></nuxt>
        </transition>
      </div>

      <copyright></copyright>
    </section>
  </section>
</template>

<script>

  export default {
    data() {
      return {
        collapseAside: false
      }
    },

    created() {

    },

    mounted() {
    },

    methods: {}
  }
</script>

<style scoped lang="scss">
  .layout {
    display: flex;
    flex: auto;
    min-height: 0;
    background: #f0f2f5;
    box-sizing: border-box;
    flex-direction: row;

    .layout-aside {
      width: 256px;
      background: #001529;
      transition: all .3s ease-in-out;
      box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);

      &.aside-collapse {
        flex: 0 0 80px;
        width: 80px;
      }

      &.aside-fixed {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        min-height: 100vh;
      }
    }
  }

  .layout-main {
    flex-direction: column;
    min-height: 100vh;
    transition: all .3s ease-in-out;
  }

  .layout-header {
    width: 100%;
    height: 64px;
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  }

  .collapse-btn {
    font-size: 24px;
    padding-left: 20px;
    height: 64px;
    display: flex;
    align-items: center;
  }

  .logo {
    padding: 0 10px;

    img {
      width: 40px;
    }
  }
</style>
