<template>
  <div class="header-nav flex justify-start items-center">
    <div class="divider"></div>
    <div class="nav-group flex justify-start items-center">
      <template v-for="tab in tabs">
        <!-- 有子菜单 -->
        <template v-if="tab.submenu">
          <el-dropdown :show-timeout="0" placement="bottom" @command="clickDropDownTab">
            <div class="nav-item" :class="{active: current.currentTab === tab.key}">
              <i class="iconfont" :class="tab.icon"></i>
              <span>{{ tab.name }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <template v-for="submenu in tab.submenu">
                <el-dropdown-item :command="{tab, submenu}">
                  <div :class="{active: current.currentSubmenu && current.currentSubmenu.key === submenu.key}">
                    <i class="iconfont" :class="submenu.icon"></i>
                    <span>{{ submenu.name }}</span>
                  </div>
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <!-- 无子菜单 -->
        <template v-else>
          <div class="nav-item" :class="{active: current.currentTab === tab.key}" @click="toPage(tab)">
            <i class="iconfont" :class="tab.icon"></i>
            <span>{{ tab.name }}</span>
          </div>
        </template>
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
      tabs: {
        type: Array,
        required: true
      },
      current: {
        type: Object,
        default: function () {
          return {
            currentTab: null,
            currentSubmenu: {},
            currentName: null
          }
        }
      },
    },

    data() {
      return {}
    },

    methods: {
      clickDropDownTab(command) {
        this.$router.push({name: command.submenu.key})
        this.$emit('change-route', {tab: command.tab, sub: command.submenu})
      },

      toPage(route) {
        this.$router.push({name: route.key})
        this.$emit('change-route', {tab: route, sub: null})
      },

      needHelp() {

      },
    }
  }
</script>

<style scoped lang="scss">
  .active {
    color: #66b1ff !important;
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
          font-size: 1rem !important;
        }

        &:hover {
          color: #66b1ff;
          cursor: pointer;
        }
      }
    }
  }
</style>
