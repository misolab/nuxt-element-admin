<template>
  <Body>
  <span slot="title">门店管理</span>

  <el-button-group slot="action">
    <el-button size="small" type="primary" icon="el-icon-s-shop">添加门店</el-button>
  </el-button-group>

  <div class="flex flex-row items-start justify-start flex-wrap">
    <div class="w-1/5" v-for="i in 6">
      <div class="p-4">
        <el-card shadow="hover">
          <div class="p-0">
            <div class="font-bold text-xl mb-2">我是一个门店名称</div>
            <p class="text-gray-700 text-base">
              七牛数据处理平台针对海量数据，提供零运维、高可用、高性能的数据处理服务，日处理数近百亿次。
            </p>
          </div>
          <div class="pt-4">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
  </Body>
</template>

<script>

  export default {
    name: "index",
  }
</script>

<style scoped>

</style>
