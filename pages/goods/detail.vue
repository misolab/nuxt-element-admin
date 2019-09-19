<template>
  <div>
    <create-from :id="$route.query.id"></create-from>
  </div>
</template>

<script>
  import CreateFrom from './create'

  export default {
    name: "detail",
    components: { CreateFrom }
  }
</script>

<style scoped>

</style>
