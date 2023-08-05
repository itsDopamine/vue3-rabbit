<script setup>
</script>

<template>
  <!-- 一级路由出口 -->
  <router-view></router-view>
  <h2 class="test">Hello</h2>
  <el-button type="primary" @click="abc">我是 ElButton</el-button>
</template>

<style scoped lang="scss">
.test {
  color: $helpColor;
}
</style>
