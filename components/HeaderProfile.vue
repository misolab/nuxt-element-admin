<template>
  <div class="flex flex-row items-center head-profile">
    <div class="item" role="button">
      <i class="iconfont icon-bangzhu"></i>
    </div>
    <div class="item" role="button">
      <el-badge :value="12">
        <i class="el-icon-message"></i>
      </el-badge>
    </div>
    <div class="item">
      <el-dropdown :show-timeout="0" @command="clickDropdownItem">
        <div>
          <img class="avatar" src="https://wx.qlogo.cn/mmopen/vi_32/P1G5IYWTc7XqWZuxTqZFaLjO5ev4WFLXiaqTet0fkOVI3Il75smd5x3ibqKr959DT4A3LRHibwtoS9uibrpfibacApA/132"/>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" divided>狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">资料</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-open" command="logout" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HeaderProfile",
    data() {
      return {}
    },

    methods: {
      clickDropdownItem(command) {
        switch (command) {
          case 'logout':
            return Auth.logout()
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .el-icon-message, .iconfont {
    font-size: 24px;
  }

  .head-profile {
    padding-right: 10px;

    .item {
      padding: 0 15px;
      height: 64px;
      display: flex;
      align-items: center;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }

  .avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
</style>
