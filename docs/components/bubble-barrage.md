## 实现思路

- 把动画加到每一个元素上。
- 通过动画的时长来判断元素的动画是否走完了，走完了就把该元素从 dom 中删除。添加进另一个元素，而新进的这个元素就添加到这个元素在 dom 里的原先位置。
- 要让元素脱标的话，否则新进的元素的位置会根据 dom 的顺序，这样会导致我想让元素应该出现的位置不符合预期。
- 等最早元素的动画执行完再开始新进 dom 元素的动画，所以用一个索引记录目前在 dom 上最早执行动画的是哪个元素，再用一个索引记录下一个加入到 dom 中的元素。
- 因为每隔一段 duration 时间就会在 dom 上替换元素，`showNum*duration`时间之后 nextReplaceIndex 就已经循环回最早开始动画的元素了，而设置 animationDuration 为`showNum*duration`就可以让最早开始动画的元素此时正好动画完。

<script setup>
import BubbleBarrage from '@components-library/data-show/bubble-barrage/BubbleBarrage.vue'

const data = [
    {desc:'第一个'},
    {desc:'第二个'},
    {desc:'第三个'},
    {desc:'第四个'},
    {desc:'第五个'},
]
</script>
<style>
.bubble-barrage{
    width:100px;
    background-color:red;
    border-radius:10px;
}
</style>
<BubbleBarrage :list="data" :show-num="3" :item-height="30" class="bubble-barrage">
<template #default={item}>
    <div>{{item.desc}}</div>
</template>
</BubbleBarrage>
