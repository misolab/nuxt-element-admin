<template>
  <el-card>
    <div slot="header" class="flex flex-row justify-between items-center">
      <div>
        <span v-if="!$slots.title">{{ title }}</span>
        <slot name="title"></slot>
      </div>
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
    name: "BodyContainer",
    props: {
      title: String
    },

    mounted() {
    }
  }
</script>

<style scoped>

</style>
