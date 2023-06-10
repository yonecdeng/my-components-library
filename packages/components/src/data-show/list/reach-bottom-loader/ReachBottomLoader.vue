<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { loaderProps, loaderEmits } from './reach-bottom-loader';
const props = defineProps(loaderProps);
const emits = defineEmits(loaderEmits);
const loadRef = ref<HTMLDivElement | null>(null);
const { stop } = useIntersectionObserver(
  loadRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      emits('to-bottom');
    }
  },
  { rootMargin: props.rootMargin }
);
onUnmounted(stop);
</script>
<template>
  <div ref="loadRef">
    <slot></slot>
    <!--这个slot放loading-->
  </div>
</template>
<style lang="less" scoped></style>
