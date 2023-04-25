<script setup lang="ts">
import { watch, ref, computed, type Ref, type VNode, nextTick } from 'vue';
import { useRafFn } from '@vueuse/core';

export interface BarrageProps<T> {
  /**
   * 每个item的高度，414下的px值
   */
  itemHeight?: number;
  /**
   * 这个元素高度运动时间，单位 s
   */
  duration?: number;
  /**
   * array 传入数据
   */
  list?: Array<T>;
  /**
   * 展示的弹幕数量
   */
  showNum?: number;
  /**
   * 播放
   */
  play?: boolean;
}

export interface BarrageSlots<T> {
  default?: ({ item }: { item: T }) => VNode[] | undefined;
}

interface BulletItemWithUid {
  item: unknown;
  uid: number;
}

const props = withDefaults(defineProps<BarrageProps<unknown>>(), {
  itemHeight: 60,
  duration: 2,
  list: () => [],
  showNum: 2,
  play: true
});

let uid = 1;
const listWithUid: Ref<BulletItemWithUid[]> = computed(() => {
  return props.list.map((item) => ({
    item,
    uid: uid++
  }));
});

const inDomList = ref<BulletItemWithUid[]>([]);
const inDomListVisibleList = ref<boolean[]>([]); //索引对应inDomList的索引，表示里面的元素是否可见
let nextReplaceIndex = 0; //在inDomList中下一个要被替换的索引
let nextAddToIndomlistIndex = 0; //下一个准备加入到inDomList的元素 在data中的索引。

const beginNextItemAnimation = () => {
  if (listWithUid.value.length === 0) {
    //防止越界
    return;
  }
  if (nextReplaceIndex >= 0 && nextReplaceIndex < props.showNum) {
    //防止越界
    inDomListVisibleList.value.splice(nextReplaceIndex, 1, false); //将该元素从dom中删除
  }
  nextTick(() => {
    inDomList.value.splice(
      //替换下一个元素
      nextReplaceIndex,
      1,
      listWithUid.value[nextAddToIndomlistIndex]
    );
    inDomListVisibleList.value.splice(nextReplaceIndex, 1, true); //让元素在dom中出现
    nextReplaceIndex = ++nextReplaceIndex % props.showNum;
    nextAddToIndomlistIndex = ++nextAddToIndomlistIndex % props.list.length;
  });
};

let lastTime = -Infinity;
const { pause: pauseAnimation, resume: resumeAnimation } = useRafFn(
  () => {
    const now = Date.now();
    if (now - lastTime > props.duration * 1000) {
      //每隔一段duration时间就会在dom上开启新一个元素的动画
      lastTime = now;
      beginNextItemAnimation();
    }
  },
  { immediate: false }
);

const itemStyle = computed(() => {
  return {
    height: `${props.itemHeight}px`,
    animationDuration: `${props.showNum * props.duration}s`, //因为每隔一段duration时间就会在dom上替换元素，showNum*duration时间之后nextReplaceIndex就已经循环回最早开始动画的元素了，而设置animationDuration为showNum*duration就可以让最早开始动画的元素此时正好动画完。
    '--item-move-step-1': `${0 - props.showNum * 80}%`, //移动相对于自身的百分比
    '--item-move-step-2': `${0 - props.showNum * 100}%`
  };
});
const containerHeight = computed(() => {
  return {
    height: `${props.itemHeight * props.showNum}px`
  };
});
watch(
  //暂停动画
  () => props.play,
  (val) => {
    console.log(val);
    if (val) {
      resumeAnimation();
    } else {
      pauseAnimation();
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="bubble-barrage-container" :style="containerHeight">
    <template v-for="(object, index) of inDomList" :key="object.uid">
      <div v-if="inDomListVisibleList[index]" :style="itemStyle">
        <slot :item="object.item"></slot>
      </div>
    </template>
  </div>
</template>
<style lang="less" scoped>
@keyframes move {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(var(--item-move-step-1));
  }
  100% {
    opacity: 0;
    transform: translateY(var(--item-move-step-2));
  }
}
.bubble-barrage-container {
  position: relative; //如果不让他脱标的话，元素的位置会根据dom的顺序，这样会导致我想让元素应该出现的位置不符合预期（可以删掉绝对定位看看效果）
  & > div {
    position: absolute;
    bottom: 0;
    opacity: 0;
    animation: move linear;
  }
}
</style>
