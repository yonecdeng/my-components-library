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

## 实现思路

### 循环间隔

效果：

循环的时候从头开始，用户能明显感知到是循环了：

思路：

利用 translateX 进行元素的移动。一开始将元素向右偏移自身一个宽度使其移出屏幕外，然后利用 rAF 修改 translateX 的值实现动画。

利用 useIntersectionObserver，监听第一个元素，当第一个元素消失时判断如果要开始循环了就监听最后一个元素；如果还没到循环就更新页面上的数据（shift 第一个元素，push 下一个元素进来（利用一个指针指向下一次要加入的元素，如果是要循环则指针置为 0 即可））并且重置动画（用户肉眼是看不到这些事情的，肉眼看起来是流畅的），然后监听页面更新后的第一个元素。

在监听最后一个元素时，如果最后一个元素出现过再消失（因为我缓冲了一个元素，这个元素可能给他绑监听器的时候就不在可视区上，那就会直接触发函数了，所以要确保是曾经出现过再消失），则重置页面上的数据并且监听第一个元素。

每个监听器触发消失时都会取消监听器，同一时间段只有一个监听器。

### 连续不断

效果：

循环的时候直接贴到后面，不需要间隔开。

思路：

基于循环间隔修改：

不需要监听最后一个元素了，只监听第一个元素消失，消失后删第一个元素，在后面加一个元素（利用一个指针指向下一次要加入的元素，如果是要循环则指针置为 0 即可），然后继续监听新的第一个元素，以此循环。

一开始就保证数量是满足最大同时展示数的。如果一开始不足用户的设定的最大同时展示数，则循环补进来。
