<script setup>
import SingleLineBarrage from '@components-library/single-line-barrage'

const data = [
    {desc:'第一个'},
    {desc:'第二个'},
    {desc:'第三个'},
    {desc:'第四个'},
    {desc:'第五个'}
]

</script>
<style scoped>
.horizontal-barrage {
    width:500px;
    height: 29px;
}
:deep(.item){
    width:100px;
    margin-left:20px;
}
</style>

# SingleLineBarrage

轮播弹幕

## 基础用法

<SingleLineBarrage  :list="data" class="horizontal-barrage" :max-show-num="5">
<template #default="{ item }">

<div class="desc">
{{ item.desc }}
</div>
</template>
</SingleLineBarrage>

<details>
<summary>展开查看代码</summary>

```vue
<template>
  <SingleLineBarrage :list="data" class="horizontal-barrage" :max-show-num="5">
    <template #default="{ item }">
      <div class="desc">
        {{ item.desc }}
      </div>
    </template>
  </SingleLineBarrage>
</template>
<script setup>
import SingleLineBarrage from '@components-library/single-line-barrage';

const data = [
  { desc: '第一个' },
  { desc: '第二个' },
  { desc: '第三个' },
  { desc: '第四个' },
  { desc: '第五个' }
];
</script>
<style scoped>
.horizontal-barrage {
  width: 500px;
  height: 29px;
}
:deep(.item) {
  width: 100px;
  margin-left: 20px;
}
</style>
```

</details>

## props&slots

```ts
export interface SingleLineBarrageProps<T> {
  /**
   * array 传入数据
   */
  list: Array<T>;
  /**
   * 最大在页面中能同时完整展示的弹幕数量
   */
  maxShowNum?: number;
  /**
   * 元素运动速率，表示 每一帧移动的px值
   */
  speed?: number;
}

export interface SingleLineBarrageSlots<T> {
  default?: ({ item }: { item: T }) => VNode[] | undefined;
}
```
