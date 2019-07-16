<template>
  <div class="profile">
    <el-dropdown :show-timeout="0" @visible-change="dropdownVisibleChange" @command="clickDropdownItem">
      <el-badge is-dot :hidden="!unreadNotices">
        <img class="avatar infinite bounceIn" :class="{ 'animated' : reminder}" src="https://wx.qlogo.cn/mmopen/vi_32/P1G5IYWTc7XqWZuxTqZFaLjO5ev4WFLXiaqTet0fkOVI3Il75smd5x3ibqKr959DT4A3LRHibwtoS9uibrpfibacApA/132"/>
      </el-badge>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-bell" class="clearfix" command="notices">
          通知
          <el-badge class="mark" :max="9" :value="unreadNotices"></el-badge>
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" divided>狮子头</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">资料</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-open" command="logout" divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: "HeaderProfile",
    data() {
      return {
        unreadNotices: null,
        dropdownVisible: false,
      }
    },

    computed: {
      reminder() {
        return this.unreadNotices && (!this.dropdownVisible)
      },
    },

    methods: {
      dropdownVisibleChange(visible) {
        this.dropdownVisible = visible
      },

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
  .profile {
    padding: 0 10px;

    .avatar {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;

      &:hover {
        animation-play-state: paused;
      }
    }
  }
</style>
