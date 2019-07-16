<template>
  <div class="py-5 ">
    <el-card>
      <div slot="header">
        <span>人员</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 40" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "staff"
  }
</script>

<style scoped>

</style>
