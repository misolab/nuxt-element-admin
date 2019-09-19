<template>
  <div class="container">
    <el-alert v-if="error.statusCode === 404"
        title="页面不存在"
        type="warning"
        center
        show-icon>
    </el-alert>

    <el-alert v-else
        title="应用发生错误异常"
        type="warning"
        center
        show-icon>
    </el-alert>
    <div class="text-center pt-2">
      <el-button type="primary" @click="$router.back()">上一页</el-button>
      <el-button @click="$router.push('/')">首 页</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error'],
  }
</script>
