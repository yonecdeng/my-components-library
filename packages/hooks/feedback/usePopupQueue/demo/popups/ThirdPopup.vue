<script setup lang="ts">
defineEmits<{
  (e: 'next'): void;
  (e: 'close'): void;
}>();
</script>
<template>
  <div>
    ThirdPopup：
    <button @click="$emit('close')">close</button>
    <button style="margin-left: 10px" @click="$emit('next')">next</button>
  </div>
</template>
<style lang="less" scoped></style>
