<script setup lang="ts">
import { currentPopup, closeCurrentPopup, showNextPopup } from './model';
</script>
<template>
  <div>
    <component
      v-if="currentPopup"
      :is="currentPopup.component"
      :props-data="currentPopup.data"
      :popup-type="currentPopup.type"
      @close="closeCurrentPopup"
      @next="showNextPopup"
    />
  </div>
</template>
<style lang="less" scoped></style>
