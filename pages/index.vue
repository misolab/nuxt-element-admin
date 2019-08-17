<template>
  <div>
    <section-block title="首页内容">
      <div v-for="o in 10" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </section-block>

    <el-card>
      <div slot="header">
        <span>首页内容</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 100" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>

</template>

<script>

  export default {
    components: {},
    created() {
      // console.log(this.$cookies.getAll());
    }
  }
</script>

<style scoped>
</style>
