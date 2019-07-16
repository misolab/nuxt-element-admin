<template>
  <el-card>
    <div slot="header" class="flex flex-row justify-between items-center">
      <div class="text-xl"><slot name="title"></slot></div>
      <div>
        <slot name="action"></slot>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "BodyContainer"
  }
</script>

<style scoped>

</style>
