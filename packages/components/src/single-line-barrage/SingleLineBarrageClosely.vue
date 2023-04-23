<script lang="ts" setup>
import {
  watch,
  ref,
  nextTick,
  type VNode,
  onMounted,
  computed,
  type ComputedRef
} from 'vue';
import { useRafFn, useIntersectionObserver } from '@vueuse/core';
import type { CSSProperties } from 'vue/types/jsx';
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
}

export interface SingleLineBarrageSlots<T> {
  default?: ({ item }: { item: T }) => VNode[] | undefined;
}

const props = withDefaults(defineProps<SingleLineBarrageProps<unknown>>(), {
  list: () => [],
  maxShowNum: 3,
  speed: 1
});

interface ListItemWithUid {
  item: unknown;
  uid: number;
}
let uid = 1;
let propsListLength = 0;
const singleLineBarrageRef = ref<HTMLDivElement>();
let singleLineBarrageWidth = 0;

let nextAddIndex = 0; //下一个准备加入到inDomList的元素 在data中的索引。
const inDomNum = props.maxShowNum + 1 + 1; //第一个加一是因为如果用户想同时完整3个弹幕的话，那页面中就有可能同时出现3+1个弹幕。//第二个加一是因为需要缓冲一个。
const translateX = ref<number>(0);

const singleLineBarrageStyles: ComputedRef<CSSProperties> = computed(() => {
  return {
    transform: `translateX(${-translateX.value}px)`
  };
});
const inDomList = ref<ListItemWithUid[]>([]);
let currentIntersectionObserverStop: (() => void) | null = null;

// 注册动画
const { pause: pauseAnimation, resume: resumeAnimation } = useRafFn(
  () => {
    translateX.value += props.speed;
  },
  { immediate: false }
);

function initInDomList() {
  inDomList.value = [];
  if (propsListLength > 0) {
    for (let i = 0; i < inDomNum; i++) {
      inDomList.value.push({
        item: props.list[i % propsListLength],
        uid: uid++
      });
    }
  }
}

function updateInDomList() {
  if (uid > inDomNum) {
    //如果uid超出了inDomNum则重置uid开始计数，避免uid无限大。因为页面上最多就出现inDomNum个元素，所以此时重置uid能确保页面上不会出现重复的uid
    uid = 1;
  }
  if (nextAddIndex >= propsListLength) {
    nextAddIndex = 0;
  }
  inDomList.value.shift();
  inDomList.value.push({
    item: props.list[nextAddIndex],
    uid: uid++
  });
  nextAddIndex++;
}

function reset() {
  pauseAnimation?.();
  currentIntersectionObserverStop?.();
  propsListLength = props.list.length;
  uid = 1;
  initInDomList();
  translateX.value = -singleLineBarrageWidth; //使得元素在屏幕之外
  nextAddIndex = inDomNum % propsListLength;
}

function installFirstElementObserver() {
  const target = singleLineBarrageRef.value?.children[0] as
    | HTMLElement
    | undefined;
  if (!target) return;
  const { stop } = useIntersectionObserver(
    target,
    ([intersectionObserverEntry]) => {
      if (intersectionObserverEntry?.isIntersecting === false) {
        pauseAnimation?.();
        updateInDomList();
        currentIntersectionObserverStop?.();
        nextTick(() => {
          translateX.value = 0;
          installFirstElementObserver();
          resumeAnimation?.();
        });
      }
    },
    {
      threshold: 0,
      root: singleLineBarrageRef.value?.parentElement,
      rootMargin: '0px 100px 0px 0px'
    } //扩大可见区域，保证我一开始将元素移出屏幕外之后元素仍在可见区
  );
  currentIntersectionObserverStop = stop;
}

function watchPropsListHandler() {
  reset();
  nextTick(() => {
    resumeAnimation?.();
    installFirstElementObserver();
  });
}

onMounted(() => {
  const width = singleLineBarrageRef.value?.getBoundingClientRect().width;
  if (width !== undefined) {
    singleLineBarrageWidth = width;
  }
  watch(() => props.list, watchPropsListHandler, { immediate: true });
});
</script>
<template>
  <div class="single-line-barrage-box">
    <div
      ref="singleLineBarrageRef"
      class="single-line-barrage"
      :style="singleLineBarrageStyles"
    >
      <template v-for="child in inDomList" :key="child.uid">
        <div class="item">
          <slot :item="child.item"></slot>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="less" scoped>
.single-line-barrage-box {
  overflow: hidden;
}

.single-line-barrage {
  width: 100%;
  white-space: nowrap;

  .item {
    display: inline-block;
    white-space: nowrap;
  }
}
</style>
