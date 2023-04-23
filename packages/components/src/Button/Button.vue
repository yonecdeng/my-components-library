<script setup lang="ts">
function handler() {
  console.log('click');
}
</script>
<template>
  <button class="button" @click="handler">这是一个按钮组件</button>
</template>

<style scoped>
.button {
  width: 100px;
  height: 100px;
  background-color: aqua;
}
</style>
