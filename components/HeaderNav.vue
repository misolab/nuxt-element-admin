<template>
  <div class="header-nav flex justify-start items-center">
    <div class="divider"></div>
    <div class="nav-group flex justify-start items-center">
      <template v-for="item in tabs">
        <el-dropdown :show-timeout="0" placement="bottom">
          <div class="nav-item" :class="{active: current === item.key}" @click="toPage(item)">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-open" command="logout">退出</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-open" command="logout">退出</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-open" command="logout">退出</el-dropdown-item>
            <el-dropdown-item icon="el-icon-s-open" command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
    <div class="divider"></div>
    <div class="nav-group">
      <div class="nav-item" @click="needHelp">
        <i class="iconfont icon-bangzhu"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderNav",
    props: {
      tabs: Array,
      current: String,
    },

    data() {
      return {}
    },

    methods: {
      toPage(route) {
        this.$router.push({name: route.key})
        this.$emit('change-nav', route)
        // this.setRoute(route)
      },

      needHelp() {

      },
    }
  }
</script>

<style scoped lang="scss">
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  }

  .nav-group .el-dropdown, .nav-group .nav-item {
    color: inherit;
    outline: none;

    &:focus {
      outline: none;
    }
  }

  .header-nav {
    .divider {
      background-color: #474960;
      /*box-shadow: 1px 1px 1px #ffffff;*/
      width: 1px;
      height: 40px;
    }

    .nav-group {
      .nav-item {
        padding: 0 15px;
        transition: all .8s cubic-bezier(.19, 1, .22, 1);

        .iconfont {
          line-height: 1;
          font-size: 1.6rem;
          vertical-align: middle;
        }

        & > span {
          vertical-align: middle;
        }

        &.active {
          color: #66b1ff;
        }

        &:hover {
          color: #66b1ff;
          cursor: pointer;
        }
      }
    }
  }
</style>
