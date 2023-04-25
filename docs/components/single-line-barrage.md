<script setup>
import SingleLineBarrage, {Mode} from '@components-library/data-show/single-line-barrage'

const data = [
    {desc:'第一个'},
    {desc:'第二个'},
    {desc:'第三个'},
    {desc:'第四个'},
    {desc:'第五个'},
]

</script>
<style scoped>
.horizontal-barrage {
    width:300px;
    height: 29px;
    background-color:#55b585;
}
:deep(.item){
    width:100px;
    margin-left:20px;
}
</style>

# SingleLineBarrage

轮播弹幕

## 循环连续不断

<SingleLineBarrage  :list="data" class="horizontal-barrage" :max-show-num="3" :mode="Mode.Closely">
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
  <SingleLineBarrage :list="data" class="horizontal-barrage" :max-show-num="3">
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
  width: 300px;
  height: 29px;
  background-color: #55b585;
}
:deep(.item) {
  width: 100px;
  margin-left: 20px;
}
</style>
```

</details>

## 循环间隔

<SingleLineBarrage  :list="data" class="horizontal-barrage" :max-show-num="3" :mode="Mode.Separate">
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
  <SingleLineBarrage :list="data" class="horizontal-barrage" :max-show-num="3">
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
  width: 300px;
  height: 29px;
  background-color: #55b585;
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
  maxShowNum: number;
  /**
   * 元素运动速率，表示 每一帧移动的px值
   */
  speed?: number;
  /**
   * 哪种模式，默认值是closely，表示弹幕循环时紧挨着上一个弹幕，如果是separate则表示循环时弹幕之间有间隔
   */
  mode?: Mode;
}

export interface SingleLineBarrageSlots<T> {
  default?: ({ item }: { item: T }) => VNode[] | undefined;
}
```
