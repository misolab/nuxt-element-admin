<template>
  <div>
    <section-block title="自定义区域列表">
      <template #action>
        <el-button type="primary" size="mini" @click="addInput.dialogVisible = true">添加区域</el-button>
      </template>
    </section-block>
  </div>
</template>

<script>
  export default {
    name: "custom"
  }
</script>

<style scoped>

</style>
